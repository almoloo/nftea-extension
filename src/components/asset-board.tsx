import { Network } from '@/lib/types';
// import Traders from '@/components/asset/traders';
import Analytics from '@/components/asset/analytics';
import Overview from '@/components/asset/overview';
// import Scores from '@/components/asset/scores';
// import Washtrade from '@/components/asset/washtrade';
// import Holders from '@/components/asset/holders';
// import PriceEstimate from '@/components/asset/price-estimate';

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
			<Analytics
				network={chain}
				contractAddress={contractAddress}
				tokenId={tokenId}
			/>
			{/* <Traders
				network={chain}
				contractAddress={contractAddress}
				tokenId={tokenId}
			/> */}
			{/* <Scores
				contractAddress={contractAddress}
				network={chain}
				tokenId={tokenId}
			/> */}
			{/* <Washtrade
				network={chain}
				contractAddress={contractAddress}
				tokenId={tokenId}
			/> */}
			{/* <Holders
				contractAddress={contractAddress}
				network={chain}
				tokenId={tokenId}
			/> */}
			{/* <PriceEstimate
				contractAddress={contractAddress}
				network={chain}
				tokenId={tokenId}
			/> */}
		</div>
	);
}
