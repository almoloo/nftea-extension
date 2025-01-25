import { Network } from '@/lib/types';
import Traders from '@/components/asset/traders';
import Analytics from '@/components/asset/analytics';
import Scores from '@/components/asset/scores';
import Washtrade from '@/components/asset/washtrade';
import Holders from '@/components/asset/holders';
import PriceEstimate from '@/components/asset/price-estimate';

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
		<div>
			AssetBoard:
			<div>Chain: {chain}</div>
			<div>Contract Address: {contractAddress}</div>
			<div>Token ID: {tokenId}</div>
			<hr />
			<Traders
				network={chain}
				contractAddress={contractAddress}
				tokenId={tokenId}
			/>
			<Analytics
				network={chain}
				contractAddress={contractAddress}
				tokenId={tokenId}
			/>
			<Scores
				contractAddress={contractAddress}
				network={chain}
				tokenId={tokenId}
			/>
			<Washtrade
				network={chain}
				contractAddress={contractAddress}
				tokenId={tokenId}
			/>
			<Holders
				contractAddress={contractAddress}
				network={chain}
				tokenId={tokenId}
			/>
			<PriceEstimate
				contractAddress={contractAddress}
				network={chain}
				tokenId={tokenId}
			/>
		</div>
	);
}
