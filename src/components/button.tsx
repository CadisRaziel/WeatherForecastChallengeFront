import clsx from 'clsx';
import { ReactNode } from 'react';

export function Button(params: {
	children: ReactNode;
	disabled?: boolean;
	isOutline?: boolean;
	onClick?: () => void;
	className?: string;
	submit?: boolean;
}) {
	return (
		<button
			type={params.submit ? 'submit' : 'button'}
			className={clsx(
				' rounded-lg px-3 text-lg font-medium hover:opacity-80 ml-20 mr-20',
				{
					'bg-[#AEAEB2] text-[#FFFFFF]': params.disabled,
					'border-2 border-[#1F1F1F] bg-[#FFFFFF] text-[#1F1F1F]': params.isOutline,
					'bg-[#27beff] text-[#FFFFFF]': !params.disabled && !params.isOutline,
				},
				params.className
			)}
			disabled={params.disabled}
			onClick={params.onClick}
		>
			{params.children}
		</button>
	);
}
