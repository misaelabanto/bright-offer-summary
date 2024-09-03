import { Global, Module } from '@nestjs/common';
import { FetchService } from '~/http/providers/fetch.provider';

@Module({
	providers: [
		{
			provide: 'FetchService',
			useValue: FetchService,
		},
	],
	exports: ['FetchService'],
})
@Global()
export class HttpModule {}
