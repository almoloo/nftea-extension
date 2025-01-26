import { fetchAssetHolders } from '@/lib/data';
import { AssetHolder, Network } from '@/lib/types';
import { useEffect, useState } from 'react';
import InfoHeading from '@/components/info-heading';
import DataBox from '@/components/data-box';
import { addressShortener, generateExplorerLink } from '@/lib/utils';

interface HoldersProps {
	network: Network;
	contractAddress: string;
	tokenId: string;
}

export default function Holders({
	network,
	contractAddress,
	tokenId,
}: HoldersProps) {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<AssetHolder | null>(null);

	useEffect(() => {
		if (data) return;
		const fetchData = async () => {
			const holdersData = await fetchAssetHolders(
				contractAddress,
				tokenId,
				network
			);
			setData(holdersData);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return 'loading...';
	}

	if (!data) {
		return 'No data';
	}

	return (
		<div className="flex flex-col gap-3">
			<section className="flex flex-col gap-2">
				<InfoHeading>Key Metrics</InfoHeading>
				<div className="grid grid-cols-2 gap-3">
					<DataBox
						title="Flag"
						value={data.flag}
					/>
					<DataBox
						title="Holders"
						value={data.holders}
						change={data.holders_change}
					/>
					<DataBox
						title="Hold Duration"
						value={data.hold_duration}
					/>
					<DataBox
						title="Past Owners"
						value={data.past_owners_count}
					/>
				</div>
			</section>
			{data.wallet_holder_new && data.wallet_holder_new.length > 0 && (
				<section className="flex flex-col gap-2">
					<InfoHeading>New Holders</InfoHeading>
					<ol className="list-decimal list-inside">
						{data.wallet_holder_new.map((holder) => (
							<li className="list-item">
								<a
									href={generateExplorerLink(network, holder)}
									target="_blank"
									key={holder}
									className="text-indigo-600 dark:text-indigo-400 hover:underline"
								>
									{addressShortener(holder)}
								</a>
							</li>
						))}
					</ol>
				</section>
			)}
		</div>
	);
}
