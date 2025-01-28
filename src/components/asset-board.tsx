import { Network } from '@/lib/types';
import Analytics from '@/components/asset/analytics';
import Holders from '@/components/asset/holders';
import Scores from '@/components/asset/scores';
import Traders from '@/components/asset/traders';
import Washtrade from '@/components/asset/washtrade';
import PriceEstimate from '@/components/asset/price-estimate';
import Overview from '@/components/asset/overview';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

interface AssetBoardProps {
	chain: Network;
	contractAddress: string;
	tokenId: string;
}

export default function AssetBoard({
	chain,
	contractAddress,
	tokenId,
}: AssetBoardProps) {
	return (
		<div className="flex flex-col gap-3">
			<Overview
				contractAddress={contractAddress}
				network={chain}
				tokenId={tokenId}
			/>
			<Accordion type="multiple">
				<AccordionItem value="analytics">
					<AccordionTrigger>Analytics</AccordionTrigger>
					<AccordionContent>
						<Analytics
							network={chain}
							contractAddress={contractAddress}
							tokenId={tokenId}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="holders">
					<AccordionTrigger>Holders</AccordionTrigger>
					<AccordionContent>
						<Holders
							contractAddress={contractAddress}
							network={chain}
							tokenId={tokenId}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="scores">
					<AccordionTrigger>Scores</AccordionTrigger>
					<AccordionContent>
						<Scores
							contractAddress={contractAddress}
							network={chain}
							tokenId={tokenId}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="traders">
					<AccordionTrigger>Traders</AccordionTrigger>
					<AccordionContent>
						<Traders
							network={chain}
							contractAddress={contractAddress}
							tokenId={tokenId}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="washtrades">
					<AccordionTrigger>Washtrades</AccordionTrigger>
					<AccordionContent>
						<Washtrade
							network={chain}
							contractAddress={contractAddress}
							tokenId={tokenId}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="priceestimate">
					<AccordionTrigger>Price Estimate</AccordionTrigger>
					<AccordionContent>
						<PriceEstimate
							contractAddress={contractAddress}
							network={chain}
							tokenId={tokenId}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
