import { fetchAssetPriceEstimate } from '@/lib/data';
import { AssetPriceEstimate, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface PriceEstimateProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

export default function PriceEstimate({
	network,
	contractAddress,
	tokenId,
}: PriceEstimateProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetPriceEstimate | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const priceEstimateData = await fetchAssetPriceEstimate(
				contractAddress,
				tokenId,
				network
			);
			setData(priceEstimateData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return loading ? (
		'loading...'
	) : (
		<div>
			<h1>Price Estimate</h1>
			<pre>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</div>
	);
}
