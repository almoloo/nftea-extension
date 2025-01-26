import { Network } from '@/lib/types';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { addressShortener, generateExplorerLink } from '@/lib/utils';

interface OverviewProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

export default function Overview({
	network,
	contractAddress,
	tokenId,
}: OverviewProps) {
	return (
		<section className="flex flex-col gap-2 bg-white/75 dark:bg-neutral-200/10 p-3 rounded-xl">
			<h1 className="text-center font-medium text-neutral-600 dark:text-neutral-300 text-sm">
				Asset Overview
			</h1>
			<div className="key-value">
				<h3 className="title">Contract Address</h3>
				<span className="divider"></span>
				<span className="value">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<a
									href={generateExplorerLink(
										network,
										contractAddress
									)}
									target="_blank"
								>
									{addressShortener(contractAddress)}
								</a>
							</TooltipTrigger>
							<TooltipContent>
								<small>View on Explorer</small>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</span>
			</div>
			<div className="key-value">
				<h3 className="title">Token ID</h3>
				<span className="divider"></span>
				<span className="value">{tokenId}</span>
			</div>
			<div className="key-value">
				<h3 className="title">Network</h3>
				<span className="divider"></span>
				<span className="value">{network}</span>
			</div>
		</section>
	);
}
