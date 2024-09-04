import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronSchedulingProvider } from '~/scheduling/providers/cron-scheduling.provider';

@Module({
	imports: [ScheduleModule.forRoot()],
	providers: [CronSchedulingProvider],
	exports: [CronSchedulingProvider],
})
@Global()
export class SchedulingModule {}
