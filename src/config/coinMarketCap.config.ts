import { logger } from '../services/logger.service';

const coinMarketCapConfig = {
  baseUrl: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency',
  // apiKey: process.env.CMC_API_KEY,
  apiKey: 'c5425e3c-9af4-4d55-b9ac-6beb17f05960',
};

if (!coinMarketCapConfig.apiKey) {
  logger.warn(
    'CoinMarketCap configuration is missing API key, check your .env file. If you are missing API key, generate it at https://pro.coinmarketcap.com/'
  );
}

export default coinMarketCapConfig;
