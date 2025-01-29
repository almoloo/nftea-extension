import { fetchAssetAnalytics } from '@/lib/data';
import { AssetAnalytics, Network } from '@/lib/types';
import { useEffect, useState } from 'react';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';
import Loader from '@/components/loader';
import EmptyState from '@/components/empty-state';

interface AnalyticsProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

export default function Analytics({
	network,
	contractAddress,
	tokenId,
}: AnalyticsProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetAnalytics | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const analyticsData = await fetchAssetAnalytics(
				contractAddress,
				tokenId,
				network
			);
			setData(analyticsData);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return <Loader target="asset analytics" />;
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
						title="Assets"
						value={data.assets}
						change={data.assets_change}
					/>
					<DataBox
						title="Sales"
						value={data.sales}
						change={data.sales_change}
					/>
					<DataBox
						title="Volume"
						value={data.volume}
						change={data.volume_change}
					/>
				</div>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Transaction Insights</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Total Transactions"
						value={data.transactions}
					/>
					<DataBox
						title="Transfers"
						value={data.transfers}
					/>
					<DataBox
						title="Transaction Change"
						value={null}
						change={data.transactions_change}
					/>
				</div>
			</section>
		</div>
	);
}
