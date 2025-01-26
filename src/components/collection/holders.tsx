import { colors } from '@/lib/constants';
import { fetchCollectionHolders } from '@/lib/data';
import { CollectionHolders, Network } from '@/lib/types';
import { useEffect, useState } from 'react';
import {
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';

interface HoldersProps {
	contractAddress: string;
	network: Network;
}

interface ChartData {
	date: string;
	holders: number;
	tokens1: number;
	tokens2: number;
	tokens3_5: number;
	tokens6_9: number;
	tokens10_15: number;
	tokens16_25: number;
	tokens25plus: number;
}

interface PieChartData {
	name: string;
	value: number;
}

export default function Holders({ contractAddress, network }: HoldersProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionHolders | null>(null);
	const [chartData, setChartData] = useState<ChartData[]>([]);
	const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const holdersData = await fetchCollectionHolders(
				contractAddress,
				network
			);
			setData(holdersData);
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
				holders: data.total_holder_trend[index],
				tokens1: data.holders_tokens_1_trend[index],
				tokens2: data.holders_tokens_2_trend[index],
				tokens3_5: data.holders_tokens_3_5_trend[index],
				tokens6_9: data.holders_tokens_6_9_trend[index],
				tokens10_15: data.holders_tokens_10_15_trend[index],
				tokens16_25: data.holders_tokens_16_25_trend[index],
				tokens25plus: data.holders_tokens_25plus_trend[index],
			}))
		);
		setPieChartData([
			{
				name: '1 Token',
				value: +data.holders_tokens_1,
			},
			{
				name: '2 Tokens',
				value: +data.holders_tokens_2,
			},
			{
				name: '3-5 Tokens',
				value: +data.holders_tokens_3_5,
			},
			{
				name: '6-9 Tokens',
				value: +data.holders_tokens_6_9,
			},
			{
				name: '10-15 Tokens',
				value: +data.holders_tokens_10_15,
			},
			{
				name: '16-25 Tokens',
				value: +data.holders_tokens_16_25,
			},
			{
				name: '25+ Tokens',
				value: +data.holders_tokens_25plus,
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
					defaultValue="trends"
				>
					<TabsList className="w-full">
						<TabsTrigger
							value="trends"
							className="grow"
						>
							Trends
						</TabsTrigger>
						<TabsTrigger
							value="distribution"
							className="grow"
						>
							Distribution
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value="trends"
						className="p-4"
					>
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
									dataKey="holders"
									stroke={colors[0]}
									name="Holders"
								/>
								<Line
									type="monotone"
									dataKey="tokens1"
									stroke={colors[1]}
									name="1 Token"
								/>
								<Line
									type="monotone"
									dataKey="tokens2"
									stroke={colors[2]}
									name="2 Tokens"
								/>
								<Line
									type="monotone"
									dataKey="tokens3_5"
									stroke={colors[3]}
									name="3-5 Tokens"
								/>
								<Line
									type="monotone"
									dataKey="tokens6_9"
									stroke={colors[4]}
									name="6-9 Tokens"
								/>
								<Line
									type="monotone"
									dataKey="tokens10_15"
									stroke={colors[5]}
									name="10-15 Tokens"
								/>
								<Line
									type="monotone"
									dataKey="tokens16_25"
									stroke={colors[6]}
									name="16-25 Tokens"
								/>
								<Line
									type="monotone"
									dataKey="tokens25plus"
									stroke={colors[7]}
									name="25+ Tokens"
								/>
							</LineChart>
						</ResponsiveContainer>
					</TabsContent>
					<TabsContent
						value="distribution"
						className="p-4"
					>
						<ResponsiveContainer
							width="100%"
							height={150}
						>
							<PieChart>
								<Tooltip />
								<Pie
									data={pieChartData}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									outerRadius={75}
									stroke="none"
								>
									{pieChartData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={colors[index % colors.length]}
											name={entry.name}
										/>
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
					</TabsContent>
				</Tabs>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<DataBox
					title="Total Holders"
					value={data.holders}
					change={Number(data.holders_change)}
				/>
			</section>
		</div>
	);
}
