import { fetchCollectionProfile } from '@/lib/data';
import { CollectionProfile, Network } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Bar,
	BarChart,
	Cell,
	Pie,
	PieChart,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { colors } from '@/lib/constants';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';

interface ProfileProps {
	contractAddress: string;
	network: Network;
}

interface TradesDistChart {
	name: string;
	value: number;
}

interface ScoreChart {
	metric: string;
	value: number;
}

interface VolumeChart {
	name: string;
	profitable: number;
	loss: number;
}

export default function Profile({ contractAddress, network }: ProfileProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionProfile | null>(null);
	const [tradesDistChartData, setTradesDistChartData] = useState<
		TradesDistChart[]
	>([]);
	const [scoreChartData, setScoreChartData] = useState<ScoreChart[]>([]);
	const [volumeChartData, setVolumeChartData] = useState<VolumeChart[]>([]);

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

	useEffect(() => {
		if (!data) return;
		setTradesDistChartData([
			{
				name: 'Profitable',
				value: +data.profitable_trades,
			},
			{
				name: 'Loss Making',
				value: +data.loss_making_trades,
			},
			{
				name: 'Zero Profit',
				value: +data.zero_profit_trades,
			},
		]);

		setScoreChartData([
			{ metric: 'Collection Score', value: data.collection_score },
			{ metric: 'Holder Metrics', value: data.holder_metrics_score },
			{ metric: 'Liquidity', value: data.liquidity_score },
			{ metric: 'Market Dominance', value: data.market_dominance_score },
			{
				metric: 'Token Distribution',
				value: data.token_distribution_score,
			},
			{ metric: 'Metadata', value: data.metadata_score },
		]);

		setVolumeChartData([
			{
				name: 'Trading Volume',
				profitable: data.profitable_volume,
				loss: Math.abs(+data.loss_making_trades),
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
					defaultValue="distribution"
				>
					<TabsList className="w-full">
						<TabsTrigger
							value="distribution"
							className="grow"
						>
							Distribution
						</TabsTrigger>
						<TabsTrigger
							value="scores"
							className="grow"
						>
							Scores
						</TabsTrigger>
						<TabsTrigger
							value="risk"
							className="grow"
						>
							Risk
						</TabsTrigger>
					</TabsList>

					<TabsContent
						value="distribution"
						className="p-4"
					>
						<ResponsiveContainer
							width="100%"
							height={150}
						>
							<PieChart>
								<Pie
									data={tradesDistChartData}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									outerRadius={75}
									stroke="none"
								>
									{tradesDistChartData.map((entry, index) => (
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
					<TabsContent
						value="scores"
						className="p-4"
					>
						<ResponsiveContainer
							width="100%"
							height={150}
						>
							<RadarChart
								data={scoreChartData}
								cx="50%"
								cy="50%"
								outerRadius="80%"
							>
								<PolarGrid />
								<PolarAngleAxis dataKey="metric" />
								<PolarRadiusAxis
									angle={30}
									domain={[0, 100]}
								/>
								<Radar
									name="Scores"
									dataKey="value"
									stroke="#8884d8"
									fill="#8884d8"
									fillOpacity={0.6}
								/>
								<Tooltip />
							</RadarChart>
						</ResponsiveContainer>
					</TabsContent>
					<TabsContent
						value="risk"
						className="p-4"
					>
						<ResponsiveContainer
							width="100%"
							height={150}
						>
							<BarChart data={volumeChartData}>
								<XAxis dataKey="name" />
								<YAxis hide />
								<Tooltip />
								<Bar
									dataKey="profitable"
									fill="#00C49F"
									name="Profitable Volume"
								/>
								<Bar
									dataKey="loss"
									fill="#FF8042"
									name="Loss Volume"
								/>
							</BarChart>
						</ResponsiveContainer>
					</TabsContent>
				</Tabs>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Fear & Greed Index"
						value={data.fear_and_greed_index.toFixed(2)}
					/>
					<DataBox
						title="Washtrade Index"
						value={data.washtrade_index.toFixed(2)}
					/>
					<DataBox
						title="Diamond Hands"
						value={data.diamond_hands}
					/>
				</div>
			</section>
		</div>
	);
}
