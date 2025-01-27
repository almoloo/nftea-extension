import { fetchUserTraders } from '@/lib/data';
import { Network, UserTraders } from '@/lib/types';
import { useEffect, useState } from 'react';

interface TradersProps {
	address: string;
	network: Network;
}

export default function Traders({ address, network }: TradersProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<UserTraders | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const tradersData = await fetchUserTraders(address, network);
			setData(tradersData);
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
			<h1>Traders</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
