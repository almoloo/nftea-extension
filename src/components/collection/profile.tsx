import { fetchCollectionProfile } from '@/lib/data';
import { CollectionProfile, Network } from '@/lib/types';
import { useEffect, useState } from 'react';

interface ProfileProps {
	contractAddress: string;
	network: Network;
}

export default function Profile({ contractAddress, network }: ProfileProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionProfile | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const profileData = await fetchCollectionProfile(
				contractAddress,
				network
			);
			setData(profileData);
			setLoading(false);
		};
		fetchData();
	}, []);

	return loading ? (
		'loading...'
	) : (
		<div>
			<h1>Profile</h1>
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
