import { fetchUserWashtrades } from '@/lib/data';
import { Network, UserWashtrade } from '@/lib/types';
import { useEffect, useState } from 'react';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';
import Loader from '@/components/loader';
import EmptyState from '@/components/empty-state';

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
		return <Loader target="user washtrades" />;
	}

	if (!data) {
		return <EmptyState />;
	}

	return (
		<div className="flex flex-col gap-3">
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Sus. Sales"
						value={data.washtrade_suspect_sales}
						change={data.washtrade_suspect_sales_change}
					/>
					<DataBox
						title="Volume"
						value={data.washtrade_volume}
						change={data.washtrade_volume_change}
					/>
				</div>
			</section>
		</div>
	);
}
