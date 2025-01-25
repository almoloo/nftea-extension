import { fetchAssetAnalytics } from '@/lib/data';
import { AssetAnalytics, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface AnalyticsProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

export default function Analytics({
	network,
	contractAddress,
	tokenId,
}: AnalyticsProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetAnalytics | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const analyticsData = await fetchAssetAnalytics(
				contractAddress,
				tokenId,
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
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</div>
	);
}
