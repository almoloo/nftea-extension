import { fetchUserAnalytics } from '@/lib/data';
import { Network, UserAnalytics } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
	Bar,
	BarChart,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { colors } from '@/lib/constants';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';

interface AnalyticsProps {
	address: string;
	network: Network;
}

interface activityChart {
	name: string;
	value: number;
	change: number;
}

interface volumeChart {
	name: string;
	value: number;
}

export default function Analytics({ address, network }: AnalyticsProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<UserAnalytics | null>(null);
	const [activityChartData, setActivityChartData] = useState<activityChart[]>(
		[]
	);
	const [volumeChartData, setVolumeChartData] = useState<volumeChart[]>([]);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const analyticsData = await fetchUserAnalytics(address, network);
			setData(analyticsData);
			setLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!data) return;
		setActivityChartData([
			{
				name: 'Bought',
				value: +data.nft_bought,
				change: data.nft_bought_change || 0,
			},
			{
				name: 'Sold',
				value: +data.nft_sold,
				change: data.nft_sold_change || 0,
			},
			{
				name: 'Transferred',
				value: +data.nft_transfer,
				change: data.nft_transfer_change || 0,
			},
		]);
		setVolumeChartData([
			{
				name: 'Buy Volume',
				value: data.buy_volume,
			},
			{
				name: 'Sell Volume',
				value: data.sell_volume,
			},
		]);
	}, [data]);

	if (loading) {
		return 'loading...';
	}

	if (!data) {
		return 'No data';
	}

	return (
		<div className="flex flex-col gap-3">
			<section className="bg-white dark:bg-white/15 rounded-xl p-1">
				<Tabs
					className="w-full"
					defaultValue="activity"
				>
					<TabsList className="w-full">
						<TabsTrigger
							value="activity"
							className="grow"
						>
							Activity
						</TabsTrigger>
						<TabsTrigger
							value="volume"
							className="grow"
						>
							Volume
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="activity"
						className="p-4"
					>
						<ResponsiveContainer
							width="100%"
							height={150}
						>
							<BarChart data={activityChartData}>
								<XAxis dataKey="name" />
								<YAxis hide />
								<Tooltip />
								<Bar
									dataKey="value"
									fill={colors[0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</TabsContent>
					<TabsContent
						value="volume"
						className="p-4"
					>
						<ResponsiveContainer
							width="100%"
							height={150}
						>
							<PieChart>
								<Pie
									data={volumeChartData}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									outerRadius={75}
									stroke="none"
								>
									{volumeChartData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={colors[index]}
											aria-label={entry.name}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</TabsContent>
				</Tabs>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Total Volume"
						value={data.volume.toLocaleString()}
						change={data.volume_change}
					/>
					<DataBox
						title="Transactions"
						value={data.transactions}
						change={data.transactions_change}
					/>
					<DataBox
						title="Transfers"
						value={data.transfers}
						change={data.transactions_change}
					/>
				</div>
			</section>
		</div>
	);
}
