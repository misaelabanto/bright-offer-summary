import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { messageRelations, messages, offers } from '~/drizzle-schema';

const sqlite = new Database(':memory:');
export const dbMock = drizzle(sqlite, {
	schema: {
		messages,
		offers,
		messageRelations,
	},
});
