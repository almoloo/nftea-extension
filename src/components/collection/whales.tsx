import { fetchCollectionWhales } from '@/lib/data';
import { CollectionWhales, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface WhalesProps {
	contractAddress: string;
	network: Network;
}

export default function Whales({ contractAddress, network }: WhalesProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionWhales | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const whalesData = await fetchCollectionWhales(
				contractAddress,
				network
			);
			setData(whalesData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return loading ? (
		'loading...'
	) : (
		<div>
			<h1>Whales</h1>
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
