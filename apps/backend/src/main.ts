import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from '~/app.module';
import { migrateDatabase } from '~/migrate';

process.on('unhandledRejection', (reason: Error, promise: Promise<unknown>) => {
	if (process.env.NODE_ENV === 'production') {
		console.error(reason, promise);
	} else {
		throw reason;
	}
});

async function bootstrap(): Promise<void> {
	const logger = new Logger('NestApplication');
	if (process.env.NODE_ENV === 'production') {
		migrateDatabase();
	}
	const app = await NestFactory.create(AppModule, {
		cors: true,
	});

	app.enableCors();

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		})
	);

	// eslint-disable-next-line no-magic-numbers
	const port = process.env.PORT || 3000;

	setupDocs(app);

	await app.listen(port, () => {
		logger.log(`Server is running on http://localhost:${port}`);
	});
}

function setupDocs(app: INestApplication): void {
	const config = new DocumentBuilder()
		.setTitle('Bright Solar Message Schedulling API')
		.setDescription(
			'This API is used to schedule messages to be sent to customers.'
		)
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);

	app.use(
		'/docs',
		apiReference({
			theme: 'saturn',
			spec: {
				content: document,
			},
		})
	);
}

bootstrap();
