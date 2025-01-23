import { fetchCollectionWashtrade } from '@/lib/data';
import { CollectionWashtrade, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface WashtradesProps {
	contractAddress: string;
	network: Network;
}

export default function Washtrades({
	contractAddress,
	network,
}: WashtradesProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionWashtrade | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const analyticsData = await fetchCollectionWashtrade(
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
			<h1>Washtrades</h1>
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
