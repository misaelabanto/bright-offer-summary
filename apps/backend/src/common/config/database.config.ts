import { registerAs } from '@nestjs/config';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { messageRelations, messages, offers } from '~/drizzle-schema';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite, {
	schema: {
		messages,
		offers,
		messageRelations,
	},
});

export default registerAs('database', () => db);
export const close: () => void = () => sqlite.close();
