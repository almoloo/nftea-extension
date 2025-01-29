import { fetchAssetScores } from '@/lib/data';
import { AssetScores, Network } from '@/lib/types';
import { useEffect, useState } from 'react';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';
import Loader from '@/components/loader';
import EmptyState from '@/components/empty-state';

interface ScoresProps {
	contractAddress: string;
	network: Network;
	tokenId: string;
}

export default function Scores({
	contractAddress,
	network,
	tokenId,
}: ScoresProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetScores | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const scoresData = await fetchAssetScores(
				contractAddress,
				tokenId,
				network
			);
			setData(scoresData);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return <Loader target="asset scores" />;
	}

	if (!data) {
		return <EmptyState />;
	}

	return (
		<div className="flex flex-col gap-3">
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Rarity Rank"
						value={data.rarity_rank}
					/>
					<DataBox
						title="Rarity Score"
						value={data.rarity_score}
					/>
				</div>
			</section>
			<section className="flex flex-col gap-2">
				<InfoHeading>Price Info</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="All Time Low"
						value={data.all_time_low}
					/>
					<DataBox
						title="Estimated Price"
						value={data.estimated_price}
					/>
					<DataBox
						title="Price"
						value={data.price}
					/>
					<DataBox
						title="Max Price"
						value={data.max_price}
					/>
					<DataBox
						title="Ceiling Price"
						value={data.price_ceiling}
					/>
					<DataBox
						title="Start Price"
						value={data.start_price}
					/>
				</div>
			</section>
		</div>
	);
}
