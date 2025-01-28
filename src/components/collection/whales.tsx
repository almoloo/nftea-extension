import { fetchCollectionWhales } from '@/lib/data';
import { CollectionWhales, Network } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { colors } from '@/lib/constants';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';

interface WhalesProps {
	contractAddress: string;
	network: Network;
}

interface VolumeChart {
	name: string;
	volume: number;
	count: number;
	whales: number;
}

interface WalletChart {
	name: string;
	value: number;
}

export default function Whales({ contractAddress, network }: WhalesProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<CollectionWhales | null>(null);
	const [volumeChartData, setVolumeChartData] = useState<VolumeChart[]>([]);
	const [walletChartData, setWalletChartData] = useState<WalletChart[]>([]);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const whalesData = await fetchCollectionWhales(
				contractAddress,
				network
			);
			setData(whalesData);
			setLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!data) return;
		setVolumeChartData([
			{
				name: 'Buy',
				volume: data.buy_volume,
				count: parseInt(data.buy_count),
				whales: parseInt(data.buy_whales),
			},
			{
				name: 'Sell',
				volume: data.sell_volume,
				count: +data.sell_count,
				whales: +data.sell_whales,
			},
		]);

		setWalletChartData([
			{ name: 'Buy Wallets', value: +data.unique_buy_wallets },
			{ name: 'Sell Wallets', value: +data.unique_sell_wallets },
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
					defaultValue="volume"
				>
					<TabsList className="w-full">
						<TabsTrigger
							value="volume"
							className="grow"
						>
							Volume
						</TabsTrigger>
						<TabsTrigger
							value="wallets"
							className="grow"
						>
							Wallets
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value="volume"
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
									dataKey="volume"
									fill={colors[0]}
									name="Volume"
								/>
								<Bar
									dataKey="whales"
									fill={colors[1]}
									name="Whales"
								/>
								<Bar
									dataKey="count"
									fill={colors[2]}
									name="Count"
								/>
							</BarChart>
						</ResponsiveContainer>
					</TabsContent>
					<TabsContent
						value="wallets"
						className="p-4"
					>
						<ResponsiveContainer
							width="100%"
							height={150}
						>
							<PieChart>
								<Pie
									data={walletChartData}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									outerRadius={75}
									stroke="none"
								>
									{walletChartData.map((entry, index) => (
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
						value={data.total_sale_volume.toLocaleString()}
					/>
					<DataBox
						title="NFT Count"
						value={data.nft_count}
					/>
					<DataBox
						title="Unique Wallets"
						value={data.unique_wallets}
					/>
				</div>
			</section>
		</div>
	);
}
