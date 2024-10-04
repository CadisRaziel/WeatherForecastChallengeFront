import clsx from 'clsx';
import { MdOutlineClose, MdOutlineSearch } from 'react-icons/md';
import { useEffect, useId, useState } from 'react';

interface InputParams<T> {
	label?: string;
	placeholder?: string;
	type?: HTMLInputElement['type'];
	errorMessage?: string;
	isRequired?: boolean;
	readOnly?: boolean;
	min?: string;
	max?: string;
	search?: boolean;
	future?: boolean;
	halfWidth?: boolean;
	className?: string;
	mask?: string;
	otherMask?: string;
	noUpperCase?: boolean;
	minLength?: number;
	maxLength?: number;
	functionMask?: (value: string, mask: string, otherMask?: string) => string;
	options?: { value: string; complement?: string }[];
	value: T;
	setValue: (newValue: T) => void;
	name?: string;
	icon?: React.ReactNode;
	isEmail?: boolean;
	smallInput?: boolean;
	normalInput?: boolean;
}

export function Input<T extends string | number | any[]>(params: InputParams<T>) {
	const id = useId();
	const [inputText, setInputText] = useState('');
	const [error, setError] = useState<string>();

	useEffect(() => setError(params.errorMessage), [params.errorMessage]);

	function applyMask(input: string) {
		return params.functionMask && params.mask
			? params.functionMask(input, params.mask, params.otherMask)
			: input;
	}

	const maskedValue = applyMask(params.value?.toString());

	const handlePaste = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const pastedText = e.currentTarget.value;
		const maxLength = params.maxLength || 9999;

		if (pastedText.length + inputText.length > maxLength) {
			e.preventDefault();
			const truncatedText = pastedText.substring(0, maxLength - inputText.length);
			const newValue = inputText + truncatedText;
			setInputText(newValue);
			params.setValue(newValue as T);
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		let newValue = applyMask(e.currentTarget.value);
		setError(undefined);

		if (newValue.length <= (params.maxLength || 9999)) {
			setInputText(newValue);
			params.setValue(newValue as T);
		}
	};

	return (
		<>
			<div>
				<label
					className={`${
						params.halfWidth === true ? 'col-span-1' : 'col-span-2 lg:col-span-1'
					} relative flex flex-col text-base ${params.className || ''}`}
				>
					<span className={`${error ? 'text-redText' : 'text-dark'}`}>
						{params.label}
						<span className={params.isRequired ? 'font-bold text-redText' : 'hidden'}>*</span>
					</span>
					<div
						className={`${error ? 'border-redText' : 'border-[#999999]'} ${
							params.readOnly ? 'bg-gray-100' : 'bg-white'
						} flex items-center rounded-lg border`}
					>
						{params.search && <MdOutlineSearch className="ml-2 fill-gray-500 text-2xl" />}
						<input
							list={params.options && id}
							name={params.name}
							min={params.min}
							value={maskedValue}
							onChange={handleChange}
							autoComplete="new-password"
							onPause={handlePaste}
							readOnly={params.readOnly}
							type={params.type}
							max={params.max}
							minLength={params.minLength}
							maxLength={params.maxLength}
							placeholder={params.placeholder}
							className={clsx(
								params.smallInput ? 'w-16' : '',
								params.normalInput ? 'w-full' : '',
								params.readOnly && 'text-colorOnBgGray',
								'h-9 grow bg-transparent p-2 text-base focus:outline-none',
								params.type === 'number' &&
									'[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
							)}
							title={error}
						/>
						{params.search && inputText.length >= 1 && (
							<MdOutlineClose
								className="mr-2 text-xl text-gray-500 hover:cursor-pointer hover:opacity-70"
								onClick={() => {
									params.setValue('' as T);
									setInputText('');
								}}
							/>
						)}
						{params.icon && params.icon}
					</div>
				</label>
			</div>
			{params.options && (
				<datalist id={id}>
					{params.options.map((v) => (
						<option value={v.value}>{v.complement || ''}</option>
					))}
				</datalist>
			)}
		</>
	);
}

export function ReadonlyInput(params: { label: string; value?: string | number; className?: string }) {
	return params.value ? (
		<div className={clsx('relative col-span-2 flex flex-col text-base lg:col-span-1', params.className)}>
			<span className="truncate text-dark"> {params.label} </span>
			<div className="h-10 truncate rounded-lg border border-[#999999] bg-gray-100 px-4 leading-10 text-colorOnBgGray focus:outline-none">
				{params.value}
			</div>
		</div>
	) : (
		<></>
	);
}
