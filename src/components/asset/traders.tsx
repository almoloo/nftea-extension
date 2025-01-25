import { fetchAssetTraders } from '@/lib/data';
import { AssetTraders, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface TradersProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

export default function Traders({
	network,
	contractAddress,
	tokenId,
}: TradersProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetTraders | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const tradersData = await fetchAssetTraders(
				contractAddress,
				tokenId,
				network
			);
			setData(tradersData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return loading ? (
		'loading...'
	) : (
		<div>
			<h1>Traders</h1>
			<pre>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</div>
	);
}
