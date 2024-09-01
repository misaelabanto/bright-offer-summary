import 'dotenv/config';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import databaseConfig, { close } from '~/common/config/database.config';

migrate(databaseConfig(), { migrationsFolder: './drizzle' });

close();
