import { fetchCollectionAnalytics } from '@/lib/data';
import { CollectionAnalytics, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface AnalyticsProps {
	contractAddress: string;
	network: Network;
}

export default function Analytics({
	contractAddress,
	network,
}: AnalyticsProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionAnalytics | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const analyticsData = await fetchCollectionAnalytics(
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
			<h1>Analytics</h1>
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
