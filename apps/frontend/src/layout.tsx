import { Icon } from '@iconify/react';
import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<nav className="navbar flex justify-between">
				<Link to="/">
					<img className="w-40" src="/bright-logo.svg" alt="" />
				</Link>
				<ul className="flex gap-4">
					<label className="flex cursor-pointer gap-2">
						<Icon icon="mdi:brightness-7" fontSize={24} />
						<input
							type="checkbox"
							value="night"
							className="toggle theme-controller"
						/>
						<Icon icon="mdi:moon-waning-crescent" fontSize={24} />
					</label>
				</ul>
			</nav>
			<main className="flex-grow">{children}</main>
		</>
	);
};
