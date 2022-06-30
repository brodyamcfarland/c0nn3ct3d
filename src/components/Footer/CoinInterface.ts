export interface Coins {
    bitcoin: Bitcoin;
    ethereum: Ethereum;
}

export interface Bitcoin {
    usd: number;
    usd_market_cap: number;
    usd_24h_change: number;
    last_updated_at: number;
}

export interface Ethereum {
    usd: number;
    usd_market_cap: number;
    usd_24h_change: number;
    last_updated_at: number;
}