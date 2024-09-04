export interface SchedulingProvider {
	register(event: string, callback: (...args: unknown[]) => unknown): void;
	schedule(event: string, at: Date, data: unknown[]): Promise<void>;
}
