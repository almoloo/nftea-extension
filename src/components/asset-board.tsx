import { Network } from '@/lib/types';
// import Analytics from '@/components/asset/analytics';
import Holders from '@/components/asset/holders';
// import Traders from '@/components/asset/traders';
// import Scores from '@/components/asset/scores';
// import Washtrade from '@/components/asset/washtrade';
// import PriceEstimate from '@/components/asset/price-estimate';
import Overview from '@/components/asset/overview';

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
			{/* <Analytics
				network={chain}
				contractAddress={contractAddress}
				tokenId={tokenId}
			/> */}
			<Holders
				contractAddress={contractAddress}
				network={chain}
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
			{/* <PriceEstimate
				contractAddress={contractAddress}
				network={chain}
				tokenId={tokenId}
			/> */}
		</div>
	);
}
