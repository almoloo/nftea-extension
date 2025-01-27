import { fetchUserAnalytics } from '@/lib/data';
import { Network, UserAnalytics } from '@/lib/types';
import { useEffect, useState } from 'react';

interface AnalyticsProps {
	address: string;
	network: Network;
}

export default function Analytics({ address, network }: AnalyticsProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<UserAnalytics | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const analyticsData = await fetchUserAnalytics(address, network);
			setData(analyticsData);
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
			<h1>Analytics</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
