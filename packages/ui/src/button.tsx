import { FC, PropsWithChildren } from 'react';

export interface ButtonProps {
	onClick?: () => void;
	isLoading?: boolean;
	type: 'button' | 'submit' | 'reset';
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
	children,
	onClick,
	isLoading = false,
	type,
}) => {
	return (
		<button type={type} onClick={onClick} className="btn btn-primary m-2">
			{!isLoading && children}
			{isLoading && <div className="loading loading-spinner text-primary" />}
		</button>
	);
};
