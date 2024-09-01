import { getConfigToken } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { OFFER_MOCK } from '~/offer/mock/offer.mock';

import { OfferService } from '~/offer/offer.service';

describe('OfferService', () => {
	let service: OfferService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OfferService,
				{
					provide: getConfigToken('database'),
					useValue: {
						insert: vi.fn().mockReturnValue({
							values: vi.fn().mockReturnValue({
								returning: vi.fn().mockResolvedValue([
									{
										id: randomUUID(),
										...OFFER_MOCK,
									},
								]),
							}),
						}),
					},
				},
			],
		}).compile();

		service = module.get<OfferService>(OfferService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should create a new offer', async () => {
		const offer = await service.createOffer(OFFER_MOCK);

		expect(offer.id).toBeDefined();
	});
});
