import { fetchAssetTraders } from '@/lib/data';
import { AssetTraders, Network } from '@/lib/types';
import { useEffect, useState } from 'react';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';
import Loader from '@/components/loader';

interface TradersProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

export default function Traders({
	network,
	contractAddress,
	tokenId,
}: TradersProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetTraders | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const tradersData = await fetchAssetTraders(
				contractAddress,
				tokenId,
				network
			);
			setData(tradersData);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return <Loader target="asset traders" />;
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
						title="Buyers"
						value={data.traders_buyers}
						change={
							data.traders_buyers_change
								? +data.traders_buyers_change
								: null
						}
					/>
					<DataBox
						title="Sellers"
						value={data.traders_sellers}
						change={
							data.traders_sellers_change
								? +data.traders_sellers_change
								: null
						}
					/>
					<DataBox
						title="Ratio"
						value={data.traders_ratio}
						change={
							data.traders_ratio_change
								? +data.traders_ratio_change
								: null
						}
					/>
					<DataBox
						title="Total"
						value={data.traders}
						change={
							data.traders_change ? +data.traders_change : null
						}
					/>
				</div>
			</section>
		</div>
	);
}
