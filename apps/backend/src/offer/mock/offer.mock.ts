import { CreateOfferDto } from '~/offer/dto/create-offer.dto';
import { Offer } from '~/offer/offer.schema';

export const CREATE_OFFER_DTO_MOCK: CreateOfferDto = {
	systemSize: 6.6,
	panelQuantity: 12,
	panelType: 'Premium Panels 550W',
	monthlyPayment: 2140,
	initialDeposit: 0,
	annualEscalator: 4.5,
};

export const OFFER_MOCK: Offer = {
	...CREATE_OFFER_DTO_MOCK,
	id: '1',
};
