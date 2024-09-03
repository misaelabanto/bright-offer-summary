import React, { ChangeEvent, FC } from 'react';

export interface TimeInputProps
	extends Pick<
		React.InputHTMLAttributes<HTMLInputElement>,
		'name' | 'value' | 'placeholder'
	> {
	label: string;
	onChange?: (value: string) => void;
}

export const TimeInput: FC<TimeInputProps> = ({
	name,
	label,
	value,
	placeholder,
	onChange,
}) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value;
		onChange?.(value);
	};

	return (
		<div className="flex flex-col gap-2 m-2">
			<label htmlFor={name} className="text-sm text-gray-600">
				{label}
			</label>
			<input
				placeholder={placeholder}
				id={name}
				name={name}
				type="time"
				value={value}
				onChange={handleChange}
				className="input input-bordered w-full max-w-xs"
			/>
		</div>
	);
};
