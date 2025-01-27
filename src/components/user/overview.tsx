import { Network } from '@/lib/types';
import { addressShortener, generateExplorerLink } from '@/lib/utils';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface OverviewProps {
	userName: string;
	address: string;
}

export default function Overview({ userName, address }: OverviewProps) {
	return (
		<section className="flex flex-col gap-2 bg-white/75 dark:bg-neutral-200/10 p-3 rounded-xl">
			<h1 className="text-center font-medium text-neutral-600 dark:text-neutral-300 text-sm">
				User Overview
			</h1>
			<div className="key-value">
				<h3 className="title">Username</h3>
				<span className="divider"></span>
				<span className="value">{userName}</span>
			</div>
			<div className="key-value">
				<h3 className="title">Wallet Address</h3>
				<span className="divider"></span>
				<span className="value">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<a href="#">{addressShortener(address)}</a>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>
								View on Explorer
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="p-0">
								<a
									href={generateExplorerLink(
										Network.ETHEREUM,
										address
									)}
									target="_blank"
									className="block w-full p-2"
								>
									Ethereum
								</a>
							</DropdownMenuItem>
							<DropdownMenuItem className="p-0">
								<a
									href={generateExplorerLink(
										Network.POLYGON,
										address
									)}
									target="_blank"
									className="block w-full p-2"
								>
									Polygon
								</a>
							</DropdownMenuItem>
							<DropdownMenuItem className="p-0">
								<a
									href={generateExplorerLink(
										Network.AVALANCHE,
										address
									)}
									target="_blank"
									className="block w-full p-2"
								>
									Avalanche
								</a>
							</DropdownMenuItem>
							<DropdownMenuItem className="p-0">
								<a
									href={generateExplorerLink(
										Network.SOLANA,
										address
									)}
									target="_blank"
									className="block w-full p-2"
								>
									Solana
								</a>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</span>
			</div>
		</section>
	);
}
