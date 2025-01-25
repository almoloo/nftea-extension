import { LoaderPinwheelIcon } from 'lucide-react';

interface LoaderProps {
	target?: string;
}

export default function Loader({ target }: LoaderProps) {
	return (
		<div className="w-full h-full grow flex flex-col items-center justify-center gap-2 py-10">
			<LoaderPinwheelIcon className="w-10 h-10 animate-spin" />
			<p className="text-xs text-gray-500 animate-pulse">
				{target ? `Loading ${target}...` : 'Loading...'}
			</p>
		</div>
	);
}
