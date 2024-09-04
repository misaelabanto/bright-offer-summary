import { randomUUID } from 'crypto';
import { relations } from 'drizzle-orm';
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const offers = sqliteTable('offers', {
	id: text('id')
		.notNull()
		.unique()
		.$defaultFn(() => randomUUID()),
	systemSize: real('system_size').notNull(),
	panelQuantity: int('panel_quantity').notNull(),
	panelType: text('panel_type').notNull(),
	monthlyPayment: real('monthly_payment').notNull(),
	initialDeposit: real('initial_deposit').notNull(),
	annualEscalator: real('annual_escalator').notNull(),
});

export const messages = sqliteTable('messages', {
	id: text('id')
		.unique()
		.notNull()
		.$defaultFn(() => randomUUID()),
	phoneNumber: text('phone_number').notNull(),
	sendAt: text('send_at').notNull(),
	createdAt: text('created_at')
		.notNull()
		.$defaultFn(() => new Date().toISOString()),
	offer: text('offer')
		.notNull()
		.references(() => offers.id),
	status: text('status').notNull(),
});

export const messageRelations = relations(messages, ({ one }) => ({
	offer: one(offers, { fields: [messages.offer], references: [offers.id] }),
}));
