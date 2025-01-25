import { fetchCollectionTraders } from '@/lib/data';
import { CollectionTraders, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface TradersProps {
	contractAddress: string;
	network: Network;
}

export default function Traders({ contractAddress, network }: TradersProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionTraders | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const traderssData = await fetchCollectionTraders(
				contractAddress,
				network
			);
			setData(traderssData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return loading ? (
		'loading...'
	) : (
		<div>
			<h1>Traders</h1>
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
