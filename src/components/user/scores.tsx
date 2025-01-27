import { fetchUserScores } from '@/lib/data';
import { Network, UserScores } from '@/lib/types';
import { useEffect, useState } from 'react';

interface ScoresProps {
	address: string;
	network: Network;
}

export default function Scores({ address, network }: ScoresProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<UserScores | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const scoresData = await fetchUserScores(address, network);
			setData(scoresData);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return 'loading...';
	}

	if (!data) {
		return 'No data';
	}

	return (
		<div>
			<h1>Scores</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
