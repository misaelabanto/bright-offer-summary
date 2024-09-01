CREATE TABLE `messages` (
	`id` text NOT NULL,
	`phone_number` text NOT NULL,
	`send_at` text NOT NULL,
	`created_at` text NOT NULL,
	`offer` text NOT NULL,
	FOREIGN KEY (`offer`) REFERENCES `offers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` text NOT NULL,
	`system_size` real NOT NULL,
	`panel_quantity` integer NOT NULL,
	`panel_type` text NOT NULL,
	`monthly_payment` real NOT NULL,
	`initial_deposit` real NOT NULL,
	`annual_escalator` real NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `messages_id_unique` ON `messages` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `offers_id_unique` ON `offers` (`id`);