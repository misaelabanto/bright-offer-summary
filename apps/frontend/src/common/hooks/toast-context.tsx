import { Toast, ToastProps } from '@/common/toast';
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react';

export const ToastContext = createContext({});

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
	const [toast, setToast] = useState<ToastProps>();

	useEffect(() => {
		if (toast) {
			const timer = setTimeout(() => {
				setToast(undefined);
			}, 3000); // 3 seconds

			return () => clearTimeout(timer);
		}
	}, [toast]);

	// Show toast function
	const showToast = ({ message, level }: ToastProps) => {
		setToast({ message, level });
	};

	return (
		<ToastContext.Provider value={showToast}>
			{children}
			{toast && <Toast message={toast.message} level={toast.level} />}
		</ToastContext.Provider>
	);
};
