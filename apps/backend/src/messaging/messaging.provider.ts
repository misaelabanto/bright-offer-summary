export interface IMessagingProvider {
	sendMessage(phoneNumber: string, message: string): Promise<void>;
}
