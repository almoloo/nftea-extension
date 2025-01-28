import { fetchCollectionAnalytics } from '@/lib/data';
import { CollectionAnalytics, Network } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';
import { colors } from '@/lib/constants';
import Loader from '@/components/loader';

interface AnalyticsProps {
	contractAddress: string;
	network: Network;
}

interface ChartData {
	date: string;
	sales: number;
	transactions: number;
	volume: number;
}

export default function Analytics({
	contractAddress,
	network,
}: AnalyticsProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionAnalytics | null>(null);
	const [chartData, setChartData] = useState<ChartData[]>([]);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const analyticsData = await fetchCollectionAnalytics(
				contractAddress,
				network
			);
			setData(analyticsData);
			setLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!data) return;
		setChartData(
			data.block_dates.map((date, index) => ({
				date: new Date(date).toLocaleDateString('en-GB', {
					formatMatcher: 'best fit',
					day: '2-digit',
					month: 'short',
					year: 'numeric',
				}),
				sales: data.sales_trend[index],
				transactions: data.transactions_trend[index],
				volume: data.volume_trend[index],
			}))
		);
	}, [data]);

	if (loading) {
		return <Loader target="collection analytics" />;
	}

	if (!data) {
		return 'No data';
	}

	return (
		<div className="flex flex-col gap-3">
			<section className="bg-white dark:bg-white/15 rounded-xl p-4">
				<ResponsiveContainer
					width="100%"
					height={150}
				>
					<LineChart data={chartData}>
						<XAxis
							dataKey="date"
							hide
						/>
						<YAxis hide />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="sales"
							stroke={colors[0]}
						/>
						<Line
							type="monotone"
							dataKey="transactions"
							stroke={colors[1]}
						/>
						<Line
							type="monotone"
							dataKey="volume"
							stroke={colors[2]}
						/>
					</LineChart>
				</ResponsiveContainer>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Assets"
						value={data.assets}
						change={data.assets_change}
					/>
					<DataBox
						title="Floor Price"
						value={data.floor_price}
					/>
					<DataBox
						title="Total Sales"
						value={data.sales}
					/>
					<DataBox
						title="Total Volume"
						value={data.volume}
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
			<section className="text-center">
				<small className="text-neutral-500">Past 30 days</small>
			</section>
		</div>
	);
}
