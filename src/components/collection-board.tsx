import { Network } from '@/lib/types';
import { useEffect, useState } from 'react';
// import Analytics from '@/components/collection/analytics';
// import Holders from '@/components/collection/holders';
// import Scores from '@/components/collection/scores';
// import Traders from '@/components/collection/traders';
import Washtrades from '@/components/collection/washtrades';
// import Profile from '@/components/collection/profile';
// import Whales from '@/components/collection/whales';
import Overview from '@/components/collection/overview';
import Loader from './loader';

interface CollectionBoardProps {
	collection: string;
}

export default function CollectionBoard({ collection }: CollectionBoardProps) {
	const [contractAddress, setContractAddress] = useState('');
	const [network, setNetwork] = useState<Network | null>(null);
	const [loadingContractInfo, setLoadingContractInfo] = useState(true);

	useEffect(() => {
		// Fetch collection contract address
		const fetchCollectionContractAddress = async () => {
			const collectionInfo = await fetch(
				`https://api.opensea.io/api/v2/collections/${collection}`,
				{
					headers: {
						'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY,
					},
				}
			);
			const collectionInfoJson = await collectionInfo.json();
			setContractAddress(collectionInfoJson.contracts[0].address);
			setNetwork(
				collectionInfoJson.contracts[0].chain === Network.MATIC
					? Network.POLYGON
					: collectionInfoJson.contracts[0].chain
			);
			setLoadingContractInfo(false);
		};
		fetchCollectionContractAddress();
	}, []);

	return loadingContractInfo ? (
		<Loader target="collection" />
	) : (
		<div className="flex flex-col gap-3">
			<Overview
				collection={collection}
				network={network!}
				contractAddress={contractAddress}
			/>
			{/* <Analytics
				contractAddress={contractAddress}
				network={network!}
			/> */}
			{/* <Holders
				contractAddress={contractAddress}
				network={network!}
			/> */}
			{/* <Scores
				contractAddress={contractAddress}
				network={network!}
			/> */}
			{/* <Traders
				contractAddress={contractAddress}
				network={network!}
			/> */}
			<Washtrades
				contractAddress={contractAddress}
				network={network!}
			/>
			{/* <Profile
				contractAddress={contractAddress}
				network={network!}
			/> */}
			{/* <Whales
				contractAddress={contractAddress}
				network={network!}
			/> */}
		</div>
	);
}
