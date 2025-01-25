import { fetchAssetScores } from '@/lib/data';
import { AssetScores, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface ScoresProps {
	contractAddress: string;
	network: Network;
	tokenId: string;
}

export default function Scores({
	contractAddress,
	network,
	tokenId,
}: ScoresProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetScores | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const scoresData = await fetchAssetScores(
				contractAddress,
				tokenId,
				network
			);
			setData(scoresData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return loading ? (
		'loading...'
	) : (
		<div>
			<h1>Scores</h1>
			<pre>
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</div>
	);
}
