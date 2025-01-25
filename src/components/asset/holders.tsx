import { fetchAssetHolders } from '@/lib/data';
import { AssetHolder, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface HoldersProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

export default function Holders({
	network,
	contractAddress,
	tokenId,
}: HoldersProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetHolder | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const holdersData = await fetchAssetHolders(
				contractAddress,
				tokenId,
				network
			);
			setData(holdersData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return loading ? (
		'loading...'
	) : (
		<div>
			<h1>Holders</h1>
			<pre>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</div>
	);
}
