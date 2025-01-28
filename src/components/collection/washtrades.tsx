import { colors } from '@/lib/constants';
import { fetchCollectionWashtrade } from '@/lib/data';
import { CollectionWashtrade, Network } from '@/lib/types';
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

interface WashtradesProps {
	contractAddress: string;
	network: Network;
}

interface ChartData {
	date: string;
	assets: number;
	sales: number;
	transactions: number;
	volume: number;
	wallets: number;
}

export default function Washtrades({
	contractAddress,
	network,
}: WashtradesProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionWashtrade | null>(null);
	const [chartData, setChartData] = useState<ChartData[]>([]);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const washtradesData = await fetchCollectionWashtrade(
				contractAddress,
				network
			);
			setData(washtradesData);
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
				assets: data.washtrade_assets_trend[index],
				sales: data.washtrade_suspect_sales_trend[index],
				transactions: data.washtrade_suspect_transactions_trend[index],
				volume: data.washtrade_volume_trend[index],
				wallets: data.washtrade_wallets_trend[index],
			}))
		);
	}, [data]);

	if (loading) {
		return 'loading...';
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
							dataKey="assets"
							stroke={colors[0]}
						/>
						<Line
							type="monotone"
							dataKey="sales"
							stroke={colors[1]}
						/>
						<Line
							type="monotone"
							dataKey="transactions"
							stroke={colors[2]}
						/>
						<Line
							type="monotone"
							dataKey="volume"
							stroke={colors[3]}
						/>
						<Line
							type="monotone"
							dataKey="wallets"
							stroke={colors[4]}
						/>
					</LineChart>
				</ResponsiveContainer>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Assets"
						value={data.washtrade_assets}
						change={data.washtrade_assets_change}
					/>
					<DataBox
						title="Suspect Sales"
						value={data.washtrade_suspect_sales}
						change={data.washtrade_suspect_sales_change}
					/>
					<DataBox
						title="Volume"
						value={data.washtrade_volume}
						change={data.washtrade_volume_change}
					/>
					<DataBox
						title="Wallets"
						value={data.washtrade_wallets}
						change={data.washtrade_wallets_change}
					/>
				</div>
			</section>
		</div>
	);
}
