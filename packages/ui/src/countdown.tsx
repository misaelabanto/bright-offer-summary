import { FC } from 'react';

export interface CountDownProps {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export const CountDown: FC<CountDownProps> = ({
	days,
	hours,
	minutes,
	seconds,
}) => {
	return (
		<div className="flex items-center gap-2">
			<div className="flex items-center gap-1">
				<span className="text-2xl font-semibold">{days}</span>
				<span className="text-sm text-gray-600">days</span>
			</div>
			<div className="flex items-center gap-1">
				<span className="text-2xl font-semibold">{hours}</span>
				<span className="text-sm text-gray-600">hours</span>
			</div>
			<div className="flex items-center gap-1">
				<span className="text-2xl font-semibold">{minutes}</span>
				<span className="text-sm text-gray-600">minutes</span>
			</div>
			<div className="flex items-center gap-1">
				<span className="text-2xl font-semibold">{seconds}</span>
				<span className="text-sm text-gray-600">seconds</span>
			</div>
		</div>
	);
};
