import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { Network, PageType } from '@/lib/types';
import { checkPageType } from './lib/utils';
import CollectionBoard from '@/components/collection-board';
import AssetBoard from '@/components/asset-board';

function App() {
	const [url, setUrl] = useState('');
	const [isActive, setIsActive] = useState(false);
	const [type, setType] = useState<PageType | null>(null);

	// ----- CHECK CURRENT TAB URL AND INFO -----
	useEffect(() => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			setUrl(tabs[0].url!);
		});
	}, []);

	useEffect(() => {
		try {
			const pageInfo = checkPageType(url);
			setIsActive(pageInfo.isActive);
			setType(pageInfo.type);
		} catch (error) {
			console.error(error);
			setIsActive(false);
		}
	}, [url]);

	return (
		<main className="flex flex-col gap-2 min-h-screen">
			<Header />
			<section className="grow p-3">
				{isActive && type ? (
					<>
						{type === PageType.COLLECTION && (
							<CollectionBoard
								collection={url.split('/').slice(-1)[0]}
							/>
						)}
						{type === PageType.ASSET && (
							<AssetBoard
								chain={
									url.split('/')[4] === Network.MATIC
										? Network.POLYGON
										: (url.split('/')[4] as Network)
								}
								contractAddress={url.split('/')[5]}
								tokenId={url.split('/')[6]}
							/>
						)}
					</>
				) : (
					<>NOT SUPPORTED</>
				)}
			</section>
		</main>
	);
}

export default App;
