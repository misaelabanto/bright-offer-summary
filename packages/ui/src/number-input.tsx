import { ChangeEvent, FC } from 'react';

export interface NumberInputProps
	extends Pick<
		React.InputHTMLAttributes<HTMLInputElement>,
		| 'name'
		| 'min'
		| 'max'
		| 'step'
		| 'value'
		| 'title'
		| 'placeholder'
		| 'required'
	> {
	label: string;

	onChange?: (value: number) => void;
}

export const NumberInput: FC<NumberInputProps> = ({
	name,
	label,
	min,
	max,
	step,
	value,
	placeholder,
	onChange,
	required,
}) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(event.currentTarget.value);
		onChange?.(value);
	};

	return (
		<div className="flex flex-col gap-2 m-2">
			<label htmlFor={name} className="text-sm text-gray-600 focus:text-sm">
				{label}
			</label>
			<input
				placeholder={placeholder}
				id={name}
				name={name}
				type="number"
				required={required || true}
				min={min}
				max={max}
				step={step ?? 'any'}
				value={value}
				onChange={handleChange}
				className="input input-bordered w-full max-w-xs"
			/>
		</div>
	);
};
