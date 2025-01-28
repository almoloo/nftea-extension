import { useEffect, useState } from 'react';
import Loader from '@/components/loader';
import Overview from './user/overview';
import { Network } from '@/lib/types';
import Analytics from './user/analytics';
import Scores from './user/scores';
import Traders from './user/traders';
import Washtrades from './user/washtrades';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

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
			<Accordion type="multiple">
				<AccordionItem value="analytics">
					<AccordionTrigger>Analytics</AccordionTrigger>
					<AccordionContent>
						<Analytics
							address={walletAddress!}
							network={network}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="scores">
					<AccordionTrigger>Scores</AccordionTrigger>
					<AccordionContent>
						<Scores
							address={walletAddress!}
							network={network}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="traders">
					<AccordionTrigger>Traders</AccordionTrigger>
					<AccordionContent>
						<Traders
							address={walletAddress!}
							network={network}
						/>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="washtrades">
					<AccordionTrigger>Washtrades</AccordionTrigger>
					<AccordionContent>
						<Washtrades
							address={walletAddress!}
							network={network}
						/>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
