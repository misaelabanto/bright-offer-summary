import { registerAs } from '@nestjs/config';

export default registerAs('whatsapp', () => ({
	url: process.env.WHATSAPP_MESSAGING_API_URL,
}));
