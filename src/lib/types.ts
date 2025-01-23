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
	marketcap_trend: string;
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
	trader_buyers_trend: number[];
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
