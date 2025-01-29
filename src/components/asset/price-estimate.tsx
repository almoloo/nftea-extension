import { colors } from '@/lib/constants';
import { fetchAssetPriceEstimate } from '@/lib/data';
import { AssetPriceEstimate, Network } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';
import Loader from '@/components/loader';
import EmptyState from '@/components/empty-state';

interface PriceEstimateProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

interface ChartData {
	name: string;
	value: number;
}

export default function PriceEstimate({
	network,
	contractAddress,
	tokenId,
}: PriceEstimateProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetPriceEstimate | null>(null);
	const [chartData, setChartData] = useState<ChartData[]>([]);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const priceEstimateData = await fetchAssetPriceEstimate(
				contractAddress,
				tokenId,
				network
			);
			setData(priceEstimateData);
			setLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!data) return;
		setChartData([
			{
				name: 'Collection',
				value: +data.collection_drivers,
			},
			{
				name: 'Rarity',
				value: +data.nft_rarity_drivers,
			},
			{
				name: 'Sales',
				value: +data.nft_sales_drivers,
			},
		]);
	}, [data]);

	if (loading) {
		return <Loader target="asset price estimate" />;
	}

	if (!data) {
		return <EmptyState />;
	}

	return (
		<div className="flex flex-col gap-3">
			<section className="bg-white dark:bg-white/15 rounded-xl p-4">
				<ResponsiveContainer
					width="100%"
					height={150}
				>
					<BarChart data={chartData}>
						<XAxis dataKey="name" />
						<YAxis hide />
						<Tooltip />
						<Bar
							dataKey="value"
							fill={colors[1]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Estimated Price"
						value={data.price_estimate.toFixed(2)}
					/>
					<DataBox
						title="Range"
						value={`${data.price_estimate_lower_bound.toFixed(
							2
						)} - ${data.price_estimate_upper_bound.toFixed(2)}`}
					/>
					<DataBox
						title="Prediction Percentile"
						value={`${(
							parseFloat(data.prediction_percentile) * 100
						).toFixed(1)}%`}
					/>
				</div>
			</section>
			<section className="text-center">
				<small className="text-neutral-500">Past 30 days</small>
			</section>
		</div>
	);
}
