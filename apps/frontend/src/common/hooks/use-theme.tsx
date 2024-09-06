import { useEffect, useState } from 'react';

export const useTheme = () => {
	const getInitialTheme = (): 'cmyk' | 'night' => {
		return (localStorage.getItem('theme') || 'cmyk') as 'cmyk' | 'night';
	};

	const [theme, setTheme] = useState(getInitialTheme());

	useEffect(() => {
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'cmyk' ? 'night' : 'cmyk'));
	};

	return { theme, toggleTheme };
};
