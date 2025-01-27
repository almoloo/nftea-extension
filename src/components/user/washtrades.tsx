import { fetchUserWashtrades } from '@/lib/data';
import { Network, UserWashtrade } from '@/lib/types';
import { useEffect, useState } from 'react';

interface WashtradesProps {
	address: string;
	network: Network;
}

export default function Washtrades({ address, network }: WashtradesProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<UserWashtrade | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const washtradesData = await fetchUserWashtrades(address, network);
			setData(washtradesData);
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
			<h1>Washtrades</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
