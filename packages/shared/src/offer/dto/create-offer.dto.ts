import { IOffer } from '../offer';

export interface ICreateOfferDto extends Omit<IOffer, 'id' | 'code'> {}
