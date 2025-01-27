import { useEffect, useState } from 'react';
import Loader from '@/components/loader';
import Overview from './user/overview';
import { Network } from '@/lib/types';
// import Analytics from './user/analytics';
// import Scores from './user/scores';
// import Traders from './user/traders';
import Washtrades from './user/washtrades';

interface UserBoardProps {
	userName: string;
}

export default function UserBoard({ userName }: UserBoardProps) {
	const [loadingUserInfo, setLoadingUserInfo] = useState(true);
	const [walletAddress, setWalletAddress] = useState<string | null>(null);
	const [network, setNetwork] = useState<Network>(Network.ETHEREUM);

	useEffect(() => {
		const fetchUserInfo = async () => {
			const userInfo = await fetch(
				`https://api.opensea.io/api/v2/accounts/${userName}`,
				{
					headers: {
						'x-api-key': import.meta.env.VITE_OPENSEA_API_KEY,
					},
				}
			);
			const userInfoJson = await userInfo.json();
			setWalletAddress(userInfoJson.address);
			setLoadingUserInfo(false);
		};
		fetchUserInfo();
	}, []);

	if (!userName) {
		return <div>Invalid user name</div>;
	}

	if (!network) {
		setNetwork(Network.ETHEREUM);
	}

	return loadingUserInfo ? (
		<Loader target="user" />
	) : (
		<div className="flex flex-col gap-3">
			<Overview
				userName={userName}
				address={walletAddress!}
			/>
			{/* <Analytics
				address={walletAddress!}
				network={network}
			/> */}
			{/* <Scores
				address={walletAddress!}
				network={network}
			/> */}
			{/* <Traders
				address={walletAddress!}
				network={network}
			/> */}
			<Washtrades
				address={walletAddress!}
				network={network}
			/>
		</div>
	);
}
