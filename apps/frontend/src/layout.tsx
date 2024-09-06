import { ThemeToggle } from '@/common/theme-toggle';
import { FC, PropsWithChildren } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="relative">
			<nav className="navbar fixed top-0 flex justify-between shadow-lg z-20">
				<a href="/">
					<img className="w-40" src="/bright-logo.svg" alt="Bright Logo" />
				</a>
				<ul className="flex gap-4">
					<ThemeToggle />
				</ul>
			</nav>
			<main className="flex-grow mt-40">{children}</main>
		</div>
	);
};
