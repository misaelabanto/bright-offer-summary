import { FakeMessagingProvider } from '~/messaging/providers/fake.provider';

export class FakeMessagingProviderMock
	implements Readonly<FakeMessagingProvider>
{
	sendMessage = vi.fn();
}
