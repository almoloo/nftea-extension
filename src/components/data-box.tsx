import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface DataBoxProps {
	title: string;
	unit?: string;
	value: number | string | null;
	change?: number | null;
}

export default function DataBox({ title, unit, value, change }: DataBoxProps) {
	return (
		<div className="bg-white dark:bg-white/15 rounded-xl flex flex-col overflow-hidden text-center">
			<div className="flex flex-col items-center justify-center px-3 py-2 gap-1 grow">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className="w-full">
							<strong className="block text-lg font-semibold truncate w-full">
								{value === null ? 'N/A' : value}
							</strong>
						</TooltipTrigger>
						<TooltipContent>
							<small>{value === null ? 'N/A' : value}</small>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				{change && (
					<small
						className={`text-xs font-medium ${
							change > 0 ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{change.toFixed(3)}%
					</small>
				)}
			</div>
			<small className="text-xs font-medium p-2 bg-neutral-200 dark:bg-white/15">
				{title}{' '}
				{unit && <span className="text-neutral-500">({unit})</span>}
			</small>
		</div>
	);
}
