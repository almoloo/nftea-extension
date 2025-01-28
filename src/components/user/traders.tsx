import { fetchUserTraders } from '@/lib/data';
import { Network, UserTraders } from '@/lib/types';
import { useEffect, useState } from 'react';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';
import Loader from '@/components/loader';

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
		return <Loader target="user traders" />;
	}

	if (!data) {
		return 'No data';
	}

	return (
		<div className="flex flex-col gap-3">
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Total Traders"
						value={data.traders}
						change={data.traders_change}
					/>
					<DataBox
						title="Buyers"
						value={data.traders_buyers}
						change={data.traders_buyers_change}
					/>
					<DataBox
						title="Sellers"
						value={data.traders_sellers}
						change={data.traders_sellers_change}
					/>
				</div>
			</section>
		</div>
	);
}
