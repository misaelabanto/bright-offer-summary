import { useEffect, useState } from 'react';

export const useTheme = () => {
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'cmyk');

	useEffect(() => {
		localStorage.setItem('theme', theme);
		document.querySelector('html')!.setAttribute('data-theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'cmyk' ? 'night' : 'cmyk'));
	};

	return { theme, toggleTheme };
};
