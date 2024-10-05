import clsx from 'clsx';
import { ReactNode, createContext, useContext, useState } from 'react';
import { MdAnnouncement, MdCheckCircle, MdClose, MdError } from 'react-icons/md';

type AlertType = 'error' | 'success' | 'default';

interface AlertContextData {
	isVisible: boolean;
	showAlert: (message: string[], type: AlertType) => void;
	showAlertWithProgress: (message: string[]) => () => void;
}

const AlertContext = createContext<AlertContextData | undefined>(undefined);

export const AlertProvider = (props: { children: ReactNode }) => {
	const [alertData, setAlertData] = useState<{
		message: string[];
		type: AlertType;
		progress: boolean;
	} | null>(null);

	const closeAlert = () => setAlertData(null);

	function showAlert(message: string[], type: AlertType) {
		setAlertData({ message, type, progress: false });
		setTimeout(closeAlert, message.length === 1 ? 3000 : message.length < 10 ? 6000 : 9000);
	}

	function showAlertWithProgress(message: string[]): () => void {
		setAlertData({ message, type: 'success', progress: true });
		return closeAlert;
	}

	return (
		<AlertContext.Provider value={{ showAlert, isVisible: !!alertData, showAlertWithProgress }}>
			{props.children}
			{alertData && (
				<div className="absolute right-6 top-20 z-20 max-h-[80%] min-w-[256px] overflow-auto rounded-md bg-white shadow shadow-gray-400">
					<div className="flex flex-row items-start gap-2 px-2 pb-2 pt-2">
						<div className="flex flex-col items-start gap-2">
							{alertData.message.map((m, index) => (
								<div key={index} className="flex flex-row items-center gap-2">
									{alertData.type === 'error' ? (
										<MdError className="min-h-[15px] min-w-[15px] fill-red-400" />
									) : alertData.type === 'success' ? (
										<MdCheckCircle className="min-h-[15px] min-w-[15px] fill-alertGreen" />
									) : (
										<MdAnnouncement className="min-h-[15px] min-w-[15px] fill-yellow-300" />
									)}
									<p className="text-base font-medium text-dark">{m}</p>
								</div>
							))}
						</div>
						<button onClick={closeAlert} className="ml-auto">
							<MdClose className="mt-0.5 min-h-[20px] min-w-[20px] hover:opacity-80" />
						</button>
					</div>
					<div className="w-full overflow-hidden">
						<div
							className={clsx(
								!alertData.progress && 'hidden',
								'h-1.5 w-1/2 origin-left-right animate-progress',
								alertData.type === 'error'
									? 'bg-red-400'
									: alertData.type === 'success'
									? 'bg-alertGreen'
									: 'bg-yellow-300'
							)}
						></div>
					</div>
				</div>
			)}
		</AlertContext.Provider>
	);
};

export const useAlert = (): AlertContextData => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error('useAlert must be used within an AlertProvider');
	}
	return context;
};
