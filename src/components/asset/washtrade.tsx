import { colors } from '@/lib/constants';
import { fetchAssetWashtrade } from '@/lib/data';
import { AssetWashtrade, Network } from '@/lib/types';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlertIcon } from 'lucide-react';
import Loader from '@/components/loader';

interface WashtradeProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

interface ChartData {
	name: string;
	value: number;
	change: number;
}

export default function Washtrade({
	network,
	contractAddress,
	tokenId,
}: WashtradeProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetWashtrade | null>(null);
	const [chartData, setChartData] = useState<ChartData[]>([]);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const washtradeData = await fetchAssetWashtrade(
				contractAddress,
				tokenId,
				network
			);
			setData(washtradeData);
			setLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (!data) return;
		setChartData([
			{
				name: 'Sus. Sales',
				value: +data.washtrade_suspect_sales,
				change: data.washtrade_suspect_sales_change
					? +data.washtrade_suspect_sales_change
					: 0,
			},
			{
				name: 'Sus. TX',
				value: +data.washtrade_suspect_transactions,
				change: data.washtrade_suspect_transactions_change,
			},
			{
				name: 'Sus. Wallets',
				value: +data.washtrade_wallets,
				change: data.washtrade_wallets_change
					? +data.washtrade_wallets_change
					: 0,
			},
		]);
	}, [data]);

	if (loading) {
		return <Loader target="asset washtrade" />;
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
					<BarChart data={chartData}>
						<XAxis dataKey="name" />
						<YAxis hide />
						<Tooltip />
						<Bar
							dataKey="value"
							fill={colors[0]}
							name="Count"
						/>
					</BarChart>
				</ResponsiveContainer>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				{data.flag === 1 && (
					<Alert>
						<TriangleAlertIcon className="w-4 h-4" />
						<AlertTitle>Be Careful!</AlertTitle>
						<AlertDescription>
							High Risk Activity Detected
						</AlertDescription>
					</Alert>
				)}
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Assets"
						value={data.washtrade_assets}
						change={data.washtrade_assets_change}
					/>
					<DataBox
						title="Volume"
						value={data.washtrade_volume}
						change={data.washtrade_volume_change}
					/>
				</div>
			</section>
		</div>
	);
}
