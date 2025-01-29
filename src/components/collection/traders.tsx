import { colors } from '@/lib/constants';
import { fetchCollectionTraders } from '@/lib/data';
import { CollectionTraders, Network } from '@/lib/types';
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
import Loader from '@/components/loader';
import EmptyState from '@/components/empty-state';

interface TradersProps {
	contractAddress: string;
	network: Network;
}

interface ChartData {
	date: string;
	buyers: number;
	sellers: number;
	ratio: number;
	total: number;
}

export default function Traders({ contractAddress, network }: TradersProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionTraders | null>(null);
	const [chartData, setChartData] = useState<ChartData[]>([]);

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
				buyers: data.traders_buyers_trend[index],
				sellers: data.traders_sellers_trend[index],
				ratio: data.traders_ratio_trend[index],
				total: data.traders_trend[index],
			}))
		);
	}, [data]);

	if (loading) {
		return <Loader target="collection traders" />;
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
					<LineChart data={chartData}>
						<XAxis
							dataKey="date"
							hide
						/>
						<YAxis hide />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="buyers"
							stroke={colors[0]}
						/>
						<Line
							type="monotone"
							dataKey="sellers"
							stroke={colors[1]}
						/>
						<Line
							type="monotone"
							dataKey="ratio"
							stroke={colors[2]}
						/>
						<Line
							type="monotone"
							dataKey="total"
							stroke={colors[3]}
						/>
					</LineChart>
				</ResponsiveContainer>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Buyers"
						value={data.traders_buyers}
						change={+data.traders_buyers_change}
					/>
					<DataBox
						title="Sellers"
						value={data.traders_sellers}
						change={+data.traders_sellers_change}
					/>
					<DataBox
						title="Ratio"
						value={data.traders_ratio}
						change={+data.traders_ratio_change}
					/>
					<DataBox
						title="Total"
						value={data.traders}
						change={+data.traders_change}
					/>
				</div>
			</section>
			<section className="text-center">
				<small className="text-neutral-500">Past 30 days</small>
			</section>
		</div>
	);
}
