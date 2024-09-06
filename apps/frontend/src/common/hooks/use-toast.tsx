import { ToastContext } from '@/common/hooks/toast-context';
import { useContext } from 'react';

export const useToast = () => useContext(ToastContext);
