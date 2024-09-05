import { Injectable } from '@nestjs/common';
import { CronSchedulingProvider } from '~/scheduling/providers/cron-scheduling.provider';

@Injectable()
export class CronSchedulingProviderMock
	implements Readonly<CronSchedulingProvider>
{
	register: CronSchedulingProvider['register'] = vi.fn();

	schedule: CronSchedulingProvider['schedule'] = vi.fn();

	cancel: CronSchedulingProvider['cancel'] = vi.fn();
}
