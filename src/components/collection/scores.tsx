import { colors } from '@/lib/constants';
import { fetchCollectionScores } from '@/lib/data';
import { CollectionScores, Network } from '@/lib/types';
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

interface ScoresProps {
	contractAddress: string;
	network: Network;
}

interface ChartData {
	date: string;
	marketCap: number;
	averagePrice: number;
	ceilingPrice: number;
}

export default function Scores({ contractAddress, network }: ScoresProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionScores | null>(null);
	const [chartData, setChartData] = useState<ChartData[]>([]);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const scoresData = await fetchCollectionScores(
				contractAddress,
				network
			);
			setData(scoresData);
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
				marketCap: data.marketcap_trend[index],
				averagePrice: data.avg_usd_trend[index],
				ceilingPrice: data.price_ceiling_trend[index],
			}))
		);
	}, [data]);

	if (loading) {
		return <Loader target="collection score" />;
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
							dataKey="marketCap"
							stroke={colors[0]}
							name="Market Cap"
						/>
						<Line
							type="monotone"
							dataKey="averagePrice"
							stroke={colors[1]}
							name="Average Price"
						/>
						<Line
							type="monotone"
							dataKey="ceilingPrice"
							stroke={colors[2]}
							name="Ceiling Price"
						/>
					</LineChart>
				</ResponsiveContainer>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Market Cap"
						value={data.market_cap}
						change={Number(data.marketcap_change)}
					/>
					<DataBox
						title="Average Price"
						value={data.price_avg}
						change={Number(data.price_avg_change)}
					/>
					<DataBox
						title="Ceiling Price"
						value={data.price_ceiling}
					/>
					<DataBox
						title="Royalty Price"
						value={data.royalty_price}
					/>
					<DataBox
						title="Minting Revenue"
						value={data.minting_revenue}
					/>
				</div>
			</section>
		</div>
	);
}
