import { useTheme } from '@/common/hooks/use-theme';
import { Icon } from '@iconify/react';
import { FC } from 'react';

export const ThemeToggle: FC = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<label className="flex cursor-pointer gap-2">
			<Icon icon="mdi:brightness-7" fontSize={24} />
			<input
				type="checkbox"
				value={theme}
				className="toggle theme-controller"
				onChange={toggleTheme}
			/>
			<Icon icon="mdi:moon-waning-crescent" fontSize={24} />
		</label>
	);
};
