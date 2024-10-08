import { ToastProvider } from '@/common/hooks/toast-context.tsx';
import { Layout } from '@/layout.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ToastProvider>
			<Layout>
				<App />
			</Layout>
		</ToastProvider>
	</StrictMode>
);
