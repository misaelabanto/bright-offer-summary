import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';
import {
	CronSchedulingProvider,
	ONE_MINUTE,
} from '~/scheduling/providers/cron-scheduling.provider';

describe('CronSchedulingProvider', () => {
	let provider: CronSchedulingProvider;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CronSchedulingProvider,
				{
					provide: Logger,
					useClass: class LoggerMock {
						debug = vi.fn();
					},
				},
			],
		}).compile();

		provider = module.get<CronSchedulingProvider>(CronSchedulingProvider);
	});

	it('should be defined', () => {
		expect(provider).toBeDefined();
	});

	it('should register an event', () => {
		const event = 'testEvent';
		const callback = vi.fn();

		provider.register(event, callback);

		expect(provider['events'].get(event)).toBe(callback);
	});

	it('should schedule an event', async () => {
		const event = 'testEvent';
		const at = new Date();
		const data = ['data1', 'data2'];

		await provider.schedule(event, at, ...data);

		expect(provider['scheduledEvents']).toContainEqual({ event, at, data });
	});

	it('should cancel scheduled events', async () => {
		const event = 'testEvent';
		const at = new Date();
		const data = ['data1', 'data2'];

		await provider.schedule(event, at, ...data);
		await provider.cancel(...data);

		expect(provider['scheduledEvents']).not.toContainEqual({ event, at, data });
	});

	describe('process', () => {
		it('should not process future events', async () => {
			const event = 'testEvent';
			const at = new Date(Date.now() + ONE_MINUTE); // Future date
			const data = ['data1', 'data2'];
			const callback = vi.fn();

			provider.register(event, callback);
			await provider.schedule(event, at, ...data);

			await provider['process']();

			expect(callback).not.toHaveBeenCalled();
		});

		it('should process scheduled events', async () => {
			const event = 'testEvent';
			const at = new Date(Date.now() - ONE_MINUTE); // Past date
			const data = ['dataX', 'dataY'];
			const callback = vi.fn();

			provider.register(event, callback);
			await provider.schedule(event, at, ...data);

			await provider['process']();

			expect(callback).toHaveBeenCalledWith(...data);
			expect(provider['scheduledEvents']).not.toContainEqual({
				event,
				at,
				data,
			});
		});
	});

	it('should warn if no callback found for event', async () => {
		const event = 'testEvent';
		const at = new Date(Date.now() - ONE_MINUTE); // Past date
		const data = ['data1', 'data2'];

		await provider.schedule(event, at, ...data);

		await provider['process']();
	});
});
