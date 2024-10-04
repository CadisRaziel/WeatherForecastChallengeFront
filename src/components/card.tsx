import clsx from 'clsx';
import { ReactNode } from 'react';

type CardProps = {
	children: ReactNode;
	className: string;
};

export function Card(props: CardProps) {
	return (
		<div
			className={clsx(
				props.className,
				'flex flex-col rounded-2xl bg-white p-4 shadow-md shadow-gray-200 w-[auto] h-[auto]'
			)}
		>
			{props.children}
		</div>
	);
}
