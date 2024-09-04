import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import isEqual from 'lodash.isequal';
import { SchedulingProvider } from '~/scheduling/scheduling.provider';

// eslint-disable-next-line no-magic-numbers
export const ONE_MINUTE = 60 * 1000;

export interface ScheduledEvent {
	event: string;
	at: Date;
	data: unknown[];
}

@Injectable()
export class CronSchedulingProvider implements SchedulingProvider {
	private readonly logger = new Logger(CronSchedulingProvider.name);

	private events = new Map<string, (...args: unknown[]) => unknown>();
	private scheduledEvents: ScheduledEvent[] = [];

	register(
		event: string,
		callback: (...args: unknown[]) => unknown | Promise<unknown>
	): void {
		this.events.set(event, callback);
	}

	schedule(event: string, at: Date, ...data: unknown[]): Promise<void> {
		this.scheduledEvents.push({ event, at, data });
		this.logger.debug('Scheduled event', { event, at, data });
		return Promise.resolve();
	}

	cancel(...data: unknown[]): Promise<void> {
		this.scheduledEvents = this.scheduledEvents.filter(
			scheduledEvent => !isEqual(scheduledEvent.data, data)
		);
		return Promise.resolve();
	}

	@Interval(ONE_MINUTE)
	protected process(): Promise<void> {
		const now = new Date();
		for (const scheduledEvent of this.scheduledEvents) {
			if (scheduledEvent.at >= now) {
				continue;
			}
			const callback = this.events.get(scheduledEvent.event);
			if (callback) {
				callback(...scheduledEvent.data);
				this.logger.log(
					`Event ${scheduledEvent.event} scheduled at ${scheduledEvent.at} has been processed`
				);
			} else {
				this.logger.warn(`No callback found for event ${scheduledEvent.event}`);
			}
			this.cancel(scheduledEvent.data);
		}
		return Promise.resolve();
	}
}
