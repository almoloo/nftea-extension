import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { Network, PageType } from '@/lib/types';
import { checkPageType } from './lib/utils';
import UserBoard from '@/components/user-board';
import CollectionBoard from '@/components/collection-board';
import AssetBoard from '@/components/asset-board';

function App() {
	const [url, setUrl] = useState('');
	const [isActive, setIsActive] = useState(false);
	const [type, setType] = useState<PageType | null>(null);
	const [network, setNetwork] = useState<Network | null>(null);

	// ----- CHECK CURRENT TAB URL -----
	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			setUrl(tabs[0].url!);
		});
	}, []);

	useEffect(() => {
		const pageInfo = checkPageType(url);
		setIsActive(pageInfo.isActive);
		setType(pageInfo.type);
		setNetwork(pageInfo.network);
	}, [url]);

	return (
		<main className="flex flex-col gap-2">
			<Header />
			<section className="">
				{isActive && type ? (
					<>
						{type === PageType.USER && <UserBoard />}
						{type === PageType.COLLECTION && <CollectionBoard />}
						{type === PageType.ASSET && <AssetBoard />}
						{network}
					</>
				) : (
					<>NOT SUPPORTED</>
				)}
			</section>
		</main>
	);
}

export default App;
