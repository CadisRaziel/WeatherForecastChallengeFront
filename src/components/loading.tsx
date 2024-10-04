import { createContext, ReactNode, useContext, useState } from 'react';

interface Params {
	fullPage?: boolean;
	insideButton?: boolean;
}

export function Loading(params: Params) {
	return (
		<div
			className={`flex items-center justify-center ${params.fullPage ? 'h-full w-full bg-dark' : ''}`}
		>
			{params.insideButton ? (
				<div className="h-6 w-6 animate-spin rounded-full border-b-2 border-l-2 border-t-2 border-white"></div>
			) : (
				<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-l-2 border-t-2 border-blue-500"></div>
			)}
		</div>
	);
}

interface LoadingContextData {
	showLoading: () => void;
	hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextData | undefined>(undefined);

export const LoadingProvider = (params: { children: ReactNode }) => {
	const [loading, setLoading] = useState(false);

	const showLoading = () => {
		setLoading(true);
	};

	const hideLoading = () => {
		setLoading(false);
	};

	return (
		<LoadingContext.Provider value={{ showLoading, hideLoading }}>
			{params.children}
			{loading && (
				<div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
					<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-l-2 border-t-2 border-white"></div>
				</div>
			)}
		</LoadingContext.Provider>
	);
};

export const useLoading = (): LoadingContextData => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error('useLoading must be used within a LoadingProvider');
	}
	return context;
};
