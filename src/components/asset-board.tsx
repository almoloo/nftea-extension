interface AssetBoardProps {
	chain: string;
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
		</div>
	);
}
