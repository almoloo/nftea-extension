import {
	AssetAnalytics,
	AssetHolder,
	AssetPriceEstimate,
	AssetScores,
	AssetTraders,
	AssetWashtrade,
	CollectionAnalytics,
	CollectionHolders,
	CollectionProfile,
	CollectionScores,
	CollectionTraders,
	CollectionWashtrade,
	CollectionWhales,
	Network,
} from '@/lib/types';
import { unleashBaseUrl } from '@/lib/constants';

const headers = {
	accept: 'application/json',
	'x-api-key': import.meta.env.VITE_UNLEASHNFT_API_KEY,
};

export const fetchCollectionAnalytics = async (
	contractAddress: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/collection/analytics?blockchain=${network}&contract_address=${contractAddress}&time_range=30d&sort_by=sales`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}
	const modifiedData = data[0];

	modifiedData['assets_trend'] = JSON.parse(modifiedData['assets_trend']);
	modifiedData['sales_trend'] = JSON.parse(modifiedData['sales_trend']);
	modifiedData['transactions_trend'] = JSON.parse(
		modifiedData['transactions_trend']
	);
	modifiedData['transfers_trend'] = JSON.parse(
		modifiedData['transfers_trend']
	);
	modifiedData['volume_trend'] = JSON.parse(modifiedData['volume_trend']);

	return modifiedData as CollectionAnalytics;
};

export const fetchCollectionScores = async (
	contractAddress: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/collection/scores?blockchain=${network}&contract_address=${contractAddress}&time_range=30d&sort_by=market_cap`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}
	const modifiedData = data[0];

	modifiedData['avg_usd_trend'] = JSON.parse(modifiedData['avg_usd_trend']);
	modifiedData['price_ceiling_trend'] = JSON.parse(
		modifiedData['price_ceiling_trend']
	);
	modifiedData['marketcap_trend'] = JSON.parse(
		modifiedData['marketcap_trend']
	);

	return modifiedData as CollectionScores;
};

export const fetchCollectionTraders = async (
	contractAddress: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/collection/traders?blockchain=${network}&contract_address=${contractAddress}&time_range=30d&sort_by=traders`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}
	const modifiedData = data[0];

	modifiedData['traders_trend'] = JSON.parse(modifiedData['traders_trend']);
	modifiedData['traders_buyers_trend'] = JSON.parse(
		modifiedData['traders_buyers_trend']
	);
	modifiedData['traders_sellers_trend'] = JSON.parse(
		modifiedData['traders_sellers_trend']
	);
	modifiedData['traders_ratio_trend'] = JSON.parse(
		modifiedData['traders_ratio_trend']
	);

	return modifiedData as CollectionTraders;
};

export const fetchCollectionWashtrade = async (
	contractAddress: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/collection/washtrade?blockchain=${network}&contract_address=${contractAddress}&time_range=30d&sort_by=washtrade_assets`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}
	const modifiedData = data[0];

	modifiedData['washtrade_assets_trend'] = JSON.parse(
		modifiedData['washtrade_assets_trend']
	);
	modifiedData['washtrade_suspect_sales_trend'] = JSON.parse(
		modifiedData['washtrade_suspect_sales_trend']
	);
	modifiedData['washtrade_suspect_transactions_trend'] = JSON.parse(
		modifiedData['washtrade_suspect_transactions_trend']
	);
	modifiedData['washtrade_volume_trend'] = JSON.parse(
		modifiedData['washtrade_volume_trend']
	);
	modifiedData['washtrade_wallets_trend'] = JSON.parse(
		modifiedData['washtrade_wallets_trend']
	);

	return modifiedData as CollectionWashtrade;
};

export const fetchCollectionProfile = async (
	contractAddress: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/collection/profile?blockchain=${network}&contract_address=${contractAddress}&time_range=30d&sort_by=washtrade_index`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}

	return data as CollectionProfile;
};

export const fetchCollectionWhales = async (
	contractAddress: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/collection/whales?blockchain=${network}&contract_address=${contractAddress}&time_range=30d&sort_by=nft_count`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}

	return data as CollectionWhales;
};

export const fetchCollectionHolders = async (
	contractAddress: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/collection/holders?blockchain=${network}&contract_address=${contractAddress}&time_range=30d&sort_by=holders`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}
	const modifiedData = data[0];

	modifiedData['total_holder_trend'] = JSON.parse(
		modifiedData['total_holder_trend']
	);

	return modifiedData as CollectionHolders;
};

export const fetchAssetTraders = async (
	contractAddress: string,
	tokenId: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/traders?blockchain=${network}&contract_address=${contractAddress}&token_id=${tokenId}&time_range=30d&sort_by=traders`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}

	return data as AssetTraders;
};

export const fetchAssetAnalytics = async (
	contractAddress: string,
	tokenId: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/analytics?blockchain=${network}&contract_address=${contractAddress}&token_id=${tokenId}&time_range=30d&sort_by=sales`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}

	return data as AssetAnalytics;
};

export const fetchAssetScores = async (
	contractAddress: string,
	tokenId: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/scores?blockchain=${network}&contract_address=${contractAddress}&token_id=${tokenId}&time_range=30d&sort_by=price_ceiling`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}
	const modifiedData = data[0];

	modifiedData['washtrade_status'] =
		modifiedData['washtrade_status'] === 'true';

	return modifiedData as AssetScores;
};

export const fetchAssetWashtrade = async (
	contractAddress: string,
	tokenId: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/washtrade?blockchain=${network}&contract_address=${contractAddress}&token_id=${tokenId}&time_range=30d&sort_by=washtrade_volume`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}

	return data as AssetWashtrade;
};

export const fetchAssetHolders = async (
	contractAddress: string,
	tokenId: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/holders?blockchain=${network}&contract_address=${contractAddress}&token_id=${tokenId}&time_range=all&sort_by=past_owners_count`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}

	return data as AssetHolder;
};

export const fetchAssetPriceEstimate = async (
	contractAddress: string,
	tokenId: string,
	network: Network
) => {
	const response = await fetch(
		`${unleashBaseUrl()}/nft/liquify/price_estimate?blockchain=${network}&contract_address=${contractAddress}&token_id=${tokenId}`,
		{
			headers,
		}
	);
	const { data } = await response.json();
	if (!data) {
		return null;
	}
	const modifiedData = data[0];

	modifiedData['thumbnail_palette'] = JSON.parse(
		modifiedData['thumbnail_palette']
	);

	return modifiedData as AssetPriceEstimate;
};
