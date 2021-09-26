import { getCoinsList, getQuotes } from 'services/coinMarketCap.service';
import { ICoin } from 'types/coins';

import PortfolioListingPage from '../modules/portfolio/pages/PortfolioListingPage';

interface PageProps {
  query: string;
}

export const getServerSideProps = async ({ query }: PageProps) => {
  const arr: ICoin[] = [];
  const arr1: ICoin[] = [];

  await getCoinsList().then((res) => {
    res.data.map((data) => {
      const { id, name, symbol, quote } = data;
      const priceUSD = quote.USD?.price;
      const percentChange24h = quote.USD?.percent_change_24h;

      arr.push({
        id: id,
        name: name,
        symbol: symbol,
        priceUSD: priceUSD,
        percentChange24h: percentChange24h,
      });
    });
  });

  if (Object.keys(query)[0])
    await getQuotes(Object.keys(query)[0]).then((res) => {
      Object.keys(res.data).map((key) => {
        const { id, name, symbol, quote } = res.data[key];
        const priceUSD = quote.USD?.price;
        const percentChange24h = quote.USD?.percent_change_24h;

        arr1.push({
          id: id,
          name: name,
          symbol: symbol,
          priceUSD: priceUSD,
          percentChange24h: percentChange24h,
        });
      });
    });

  return {
    props: { allCoins: arr, userCoinsSSR: arr1 },
  };
};
export default PortfolioListingPage;
