export const collectionRegex = /^https:\/\/opensea\.io\/collection\/([^/]+)$/;
export const assetRegex =
	/^https:\/\/opensea\.io\/assets\/(matic|ethereum|avalanche)\/([^/]+)\/(\d+)$|^https:\/\/opensea\.io\/assets\/solana\/([^/]+)\/([^/]+)$/;
export const userRegex = /^https:\/\/opensea\.io\/([^/]+)(\/[^/?#]+)?(\?.*)?$/;

export const assetEthereumRegex =
	/^https:\/\/opensea\.io\/assets\/ethereum\/([^/]+)\/(\d+)$/;
export const assetMaticRegex =
	/^https:\/\/opensea\.io\/assets\/matic\/([^/]+)\/(\d+)$/;
export const assetAvalancheRegex =
	/^https:\/\/opensea\.io\/assets\/avalanche\/([^/]+)\/(\d+)$/;
export const assetSolanaRegex =
	/^https:\/\/opensea\.io\/assets\/solana\/([^/]+)\/([^/]+)$/;

export const unleashBaseUrl = (version = 2) =>
	`https://api.unleashnfts.com/api/v${version}`;

export const colors = [
	'#FF5733', // Vibrant Red-Orange
	'#33FF57', // Bright Green
	'#3357FF', // Vivid Blue
	'#FF33A1', // Hot Pink
	'#33FFF5', // Aqua
	'#FF8C33', // Orange
	'#8C33FF', // Purple
	'#FFD700', // Gold
	'#FF3333', // Red
	'#33FF8C', // Mint Green
];
