import 'dotenv/config';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path from 'path';
import databaseConfig from '~/common/config/database.config';

export function migrateDatabase(): void {
	migrate(databaseConfig(), {
		migrationsFolder: path.resolve(__dirname, '../drizzle'),
	});
}
