import {
	CollectionAnalytics,
	CollectionProfile,
	CollectionScores,
	CollectionTraders,
	CollectionWashtrade,
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

	return data as CollectionProfile;
};
