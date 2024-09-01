import { getConfigToken } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { dbMock } from '~/common/config/database-mock.config';
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
					useValue: dbMock,
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

	it('should update an offer', async () => {
		const offer = await service.createOffer(OFFER_MOCK);
		const updatedOffer = await service.updateOffer(offer.id, {
			...OFFER_MOCK,
			systemSize: 10,
		});

		expect(updatedOffer.systemSize).toBe(10);
	});
});
