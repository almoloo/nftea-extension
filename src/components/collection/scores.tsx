import { fetchCollectionScores } from '@/lib/data';
import { CollectionScores, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface ScoresProps {
	contractAddress: string;
	network: Network;
}

export default function Scores({ contractAddress, network }: ScoresProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionScores | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const analyticsData = await fetchCollectionScores(
				contractAddress,
				network
			);
			setData(analyticsData);
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
				<code>
					{JSON.stringify(data, null, 2)
						.replace(/"/g, '')
						.replace(/,/g, ',\n')
						.replace(/{/g, '{\n')}
				</code>
			</pre>
		</div>
	);
}
