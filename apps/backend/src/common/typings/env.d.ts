declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
		PORT: string;
		WHATSAPP_MESSAGING_API_URL: string;
		FRONTEND_URL: string;
	}
}
