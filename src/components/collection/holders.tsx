import { fetchCollectionHolders } from '@/lib/data';
import { CollectionHolders, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface HoldersProps {
	contractAddress: string;
	network: Network;
}

export default function Holders({ contractAddress, network }: HoldersProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionHolders | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const holdersData = await fetchCollectionHolders(
				contractAddress,
				network
			);
			setData(holdersData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return loading ? (
		'loading...'
	) : (
		<div>
			<h1>Holders</h1>
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
