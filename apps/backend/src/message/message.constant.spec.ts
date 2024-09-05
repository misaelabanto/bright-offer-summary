import { MESSAGE_TEXT } from '~/message/message.constant';

describe('message constants', () => {
	it('should have the correct values', () => {
		expect(MESSAGE_TEXT('test')).toBe(
			'¡Hola! Tenemos una oferta súper especial para ti. Aquí tienes un resumen con los detalles: test\n\n- Bright'
		);
	});
});
