import { ChevronsRight } from 'lucide-react';

interface InfoHeadingProps {
	children: React.ReactNode;
}

export default function InfoHeading({ children }: InfoHeadingProps) {
	return (
		<div className="flex items-center">
			<ChevronsRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400 mr-1" />
			<h2 className="font-semibold text-neutral-600 dark:text-neutral-400">
				{children}
			</h2>
			<div className="border border-dashed dark:border-neutral-700 grow ml-3"></div>
		</div>
	);
}
