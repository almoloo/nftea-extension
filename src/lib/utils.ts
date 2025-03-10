import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Network, PageType } from '@/lib/types';
import {
	assetAvalancheRegex,
	assetEthereumRegex,
	assetMaticRegex,
	assetRegex,
	assetSolanaRegex,
	collectionRegex,
	userRegex,
} from '@/lib/constants';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function checkPageType(url: string) {
	const pageInfo = {
		isActive: false,
		type: null as PageType | null,
		network: null as Network | null,
	};

	if (!url.includes('opensea.io')) {
		return pageInfo;
	}

	pageInfo.isActive = true;
	switch (true) {
		case collectionRegex.test(url):
			pageInfo.type = PageType.COLLECTION;
			break;
		case assetRegex.test(url):
			pageInfo.type = PageType.ASSET;
			if (assetMaticRegex.test(url)) {
				pageInfo.network = Network.MATIC;
			} else if (assetEthereumRegex.test(url)) {
				pageInfo.network = Network.ETHEREUM;
			} else if (assetAvalancheRegex.test(url)) {
				pageInfo.network = Network.AVALANCHE;
			} else if (assetSolanaRegex.test(url)) {
				pageInfo.network = Network.SOLANA;
			} else {
				// pageInfo.isActive = false;
			}
			break;
		case userRegex.test(url):
			pageInfo.type = PageType.USER;
			break;
		default:
			pageInfo.type = null;
			pageInfo.isActive = false;
	}

	return pageInfo;
}

export function addressShortener(address: string) {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function generateExplorerLink(network: Network, address: string) {
	switch (network) {
		case Network.ETHEREUM:
			return `https://etherscan.io/address/${address}`;
		case Network.POLYGON || Network.MATIC:
			return `https://polygonscan.com/address/${address}`;
		case Network.AVALANCHE:
			return `https://cchain.explorer.avax.network/address/${address}`;
		case Network.SOLANA:
			return `https://explorer.solana.com/address/${address}`;
		default:
			return '';
	}
}
