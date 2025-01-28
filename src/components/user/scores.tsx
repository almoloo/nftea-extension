import { colors } from '@/lib/constants';
import { fetchUserScores } from '@/lib/data';
import { Network, UserScores } from '@/lib/types';
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

interface ScoresProps {
	address: string;
	network: Network;
}

interface ProfitChart {
	name: string;
	value: number;
}

export default function Scores({ address, network }: ScoresProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<UserScores | null>(null);
	const [profitChartData, setProfitChartData] = useState<ProfitChart[]>([]);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const scoresData = await fetchUserScores(address, network);
			setData(scoresData);
			setLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!data) return;
		setProfitChartData([
			{
				name: 'Realized Profit',
				value: data.realized_profit,
			},
			{
				name: 'Unrealized Profit',
				value: data.unrealized_profit,
			},
			{
				name: 'Total PNL',
				value: +data.pnl,
			},
		]);
	}, [data]);

	if (loading) {
		return <Loader target="user scores" />;
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
					<BarChart data={profitChartData}>
						<XAxis dataKey="name" />
						<YAxis hide />
						<Tooltip />
						<Bar
							dataKey="value"
							fill={colors[0]}
							name="Value (ETH)"
						/>
					</BarChart>
				</ResponsiveContainer>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Portfolio Value"
						value={data.portfolio_value.toLocaleString()}
					/>
					<DataBox
						title="NFT Holdings"
						value={data.nft_count}
					/>
					<DataBox
						title="Collection Holdings"
						value={data.collection_count}
					/>
				</div>
			</section>
		</div>
	);
}
