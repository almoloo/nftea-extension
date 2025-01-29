import { FileXIcon } from 'lucide-react';

export default function EmptyState() {
	return (
		<div className="w-full h-full grow flex flex-col items-center justify-center gap-2 py-10">
			<FileXIcon className="w-10 h-10" />
			<p className="text-xs text-gray-500">There's no data to display.</p>
		</div>
	);
}
