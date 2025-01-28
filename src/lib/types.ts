export enum PageType {
	ASSET = 'asset',
	COLLECTION = 'collection',
	USER = 'user',
}

export enum Network {
	MATIC = 'matic',
	ETHEREUM = 'ethereum',
	AVALANCHE = 'avalanche',
	SOLANA = 'solana',
	POLYGON = 'polygon',
}

export interface CollectionAnalytics {
	assets: number;
	assets_change: number;
	assets_trend: number[];
	block_dates: string[];
	blockchain: Network;
	chain_id: number;
	contract_address: string;
	floor_price: number | null;
	floor_price_eth: number | null;
	sales: number;
	sales_change: number;
	sales_trend: number[];
	transactions: number;
	transactions_change: number;
	transactions_trend: number[];
	transfers: number;
	transfers_change: number;
	transfers_trend: number[];
	volume: number;
	volume_change: number;
	volume_trend: number[];
}

export interface CollectionScores {
	avg_usd_trend: number[];
	block_dates: string[];
	blockchain: Network;
	contract_address: string;
	market_cap: string;
	marketcap_change: string;
	marketcap_trend: number[];
	minting_revenue: number;
	price_avg: string;
	price_avg_change: string;
	price_ceiling: number;
	price_ceiling_trend: number[];
	royalty_price: string;
}

export interface CollectionTraders {
	block_dates: string[];
	blockchain: Network;
	contract_address: string;
	traders: number;
	traders_buyers: number;
	traders_buyers_change: number;
	traders_buyers_trend: number[];
	traders_change: number;
	traders_ratio: string;
	traders_ratio_change: string;
	traders_ratio_trend: number[];
	traders_sellers: number;
	traders_sellers_change: string;
	traders_sellers_trend: number[];
	traders_trend: number[];
}

export interface CollectionWashtrade {
	block_dates: string[];
	blockchain: Network;
	chain_id: number;
	contract_address: string;
	washtrade_assets: number;
	washtrade_assets_change: number | null;
	washtrade_assets_trend: number[];
	washtrade_suspect_sales: number;
	washtrade_suspect_sales_change: number | null;
	washtrade_suspect_sales_trend: number[];
	washtrade_suspect_transactions_trend: number[];
	washtrade_volume: number;
	washtrade_volume_change: number | null;
	washtrade_volume_trend: number[];
	washtrade_wallets: number;
	washtrade_wallets_change: number | null;
	washtrade_wallets_trend: number[];
}

export interface CollectionProfile {
	avg_loss_making_trades: number;
	avg_profitable_trades: number;
	blockchain: Network;
	chain_id: number;
	collection: string;
	collection_score: number;
	contract_address: string;
	diamond_hands: string;
	fear_and_greed_index: number;
	holder_metrics_score: number;
	liquidity_score: number;
	loss_making_trades: string;
	loss_making_trades_percentage: number;
	loss_making_volume: number;
	market_dominance_score: number;
	metadata_score: number;
	profitable_trades: string;
	profitable_trades_percentage: number;
	profitable_volume: number;
	token_distribution_score: number;
	washtrade_index: number;
	zero_profit_trades: string;
}

export interface CollectionWhales {
	blockchain: Network;
	buy_count: string;
	buy_volume: number;
	buy_whales: string;
	chain_id: number;
	collection: string;
	contract_address: string;
	contract_type: string;
	mint_count: string;
	mint_volume: number;
	mint_whales: string;
	nft_count: string;
	sell_count: string;
	sell_volume: number;
	sell_whales: string;
	total_mint_volume: number;
	total_sales_volume: number;
	unique_buy_wallets: string;
	unique_mint_wallets: string;
	unique_sell_wallets: string;
	unique_wallets: string;
	whale_holders: string;
}

export interface CollectionHolders {
	block_dates: string[];
	blockchain: Network;
	chain_id: number;
	contract_address: string;
	holders: string;
	holders_change: string | null;
	holders_tokens_1: string;
	holders_tokens_10_15: string;
	holders_tokens_10_15_trend: number[];
	holders_tokens_16_25: string;
	holders_tokens_16_25_trend: number[];
	holders_tokens_1_trend: number[];
	holders_tokens_2: string;
	holders_tokens_25plus: string;
	holders_tokens_25plus_trend: number[];
	holders_tokens_2_trend: number[];
	holders_tokens_3_5: string;
	holders_tokens_3_5_trend: number[];
	holders_tokens_6_9: string;
	holders_tokens_6_9_trend: number[];
	holders_tokens_9plus: string;
	holders_tokens_9plus_trend: number[];
	total_holder_trend: number[];
}

export interface AssetTraders {
	blockchain: Network;
	chain_id: number;
	contract_address: string;
	token_id: string;
	traders: string;
	traders_buyers: string;
	traders_buyers_change: string | null;
	traders_change: string | null;
	traders_ratio: string;
	traders_ratio_change: string;
	traders_sellers: string;
	traders_sellers_change: string | null;
}

export interface AssetAnalytics {
	assets: string;
	assets_change: number | null;
	blockchain: Network;
	chain_id: number;
	contract_address: string;
	contract_created_date: string;
	sales: string | number;
	sales_change: number | null;
	token_id: string;
	transactions: string | number;
	transactions_change: number | null;
	transfers: string;
	transfers_change: string | null;
	volume: number;
	volume_change: number | null;
}

export interface AssetWashtrade {
	blockchain: Network;
	chain_id: number;
	contract_address: string;
	token_id: string;
	washtrade_assets: string;
	washtrade_assets_change: string | null;
	washtrade_suspect_sales: string;
	washtrade_suspect_sales_change: string | null;
	washtrade_suspect_transactions: string;
	washtrade_suspect_transactions_change: number;
	washtrade_volume: number;
	washtrade_volume_change: string | null;
	washtrade_wallets: string;
	washtrade_wallets_change: string | null;
}

export interface AssetHolder {
	blockchain: Network;
	contract_address: string;
	flag: number;
	hold_duration: number;
	holders: number;
	holders_change: number;
	max_date: string;
	past_owners_count: number;
	token_id: string;
	wallet_holder_new: string[];
}

export interface AssetScores {
	all_time_low: number;
	blockchain: Network;
	chain_id: number;
	contract_address: string;
	estimated_price: number | null;
	max_price: number;
	price: number;
	price_ceiling: number;
	rarity_rank: number;
	rarity_score: number;
	start_price: number;
	token_id: string;
	washtrade_status: boolean;
}

export interface AssetPriceEstimate {
	address: string;
	chain_id: number;
	collection_drivers: string;
	collection_name: string;
	nft_rarity_drivers: string;
	nft_sales_drivers: string;
	prediction_percentile: string;
	price_estimate: number;
	price_estimate_lower_bound: number;
	price_estimate_upper_bound: number;
	thumbnail_palette: string[];
	thumbnail_url: string;
	token_id: string;
	token_image_url: string;
}

export interface UserAnalytics {
	blockchain: Network;
	buy_volume: number;
	chain_id: number;
	minted_value: number;
	minted_value_change: number | null;
	nft_bought: string;
	nft_bought_change: number | null;
	nft_burn: string;
	nft_burn_change: number | null;
	nft_mint: string;
	nft_mint_change: number | null;
	nft_sold: string;
	nft_sold_change: number | null;
	nft_transfer: string;
	nft_transfer_change: number | null;
	sales: string;
	sales_change: number | null;
	sell_volume: number;
	transactions: string;
	transactions_change: number | null;
	transfers: string;
	transfers_change: number | null;
	volume: number;
	volume_change: number | null;
	wallet: string;
}

export interface UserScores {
	blockchain: Network;
	chain_id: number;
	collection_count: string;
	estimated_portfolio_value: number | null;
	nft_count: string;
	pnl: string;
	portfolio_value: number;
	realized_profit: number;
	unrealized_profit: number;
	wallet: string;
	washtrade_nft_count: string;
}

export interface UserTraders {
	blockchain: Network;
	chain_id: number;
	traders: string;
	traders_buyers: string;
	traders_buyers_change: number;
	traders_change: number;
	traders_sellers: string;
	traders_sellers_change: number;
	wallet: string;
}

export interface UserWashtrade {
	blockchain: Network;
	chain_id: number;
	wallet: string;
	washtrade_suspect_sales: string;
	washtrade_suspect_sales_change: number;
	washtrade_volume: number;
	washtrade_volume_change: number;
}
