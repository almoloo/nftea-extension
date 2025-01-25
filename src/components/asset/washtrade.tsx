import { fetchAssetWashtrade } from '@/lib/data';
import { AssetWashtrade, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface WashtradeProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

export default function Washtrade({
	network,
	contractAddress,
	tokenId,
}: WashtradeProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetWashtrade | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const washtradeData = await fetchAssetWashtrade(
				contractAddress,
				tokenId,
				network
			);
			setData(washtradeData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return loading ? (
		'loading...'
	) : (
		<div>
			<h1>Washtrade</h1>
			<pre>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</div>
	);
}
