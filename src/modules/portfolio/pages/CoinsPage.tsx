import React, { ReactElement } from 'react';
import { getCoinsList } from 'services/coinMarketCap.service';
import { ICoin } from 'types/coins';

import Layout from '../components/layout';
import BasicList from '../components/list';
import Sidebar from '../components/sidebar';

interface CoinsPageProps {
  coins: ICoin[];
}

const CoinsPage = ({ coins }: CoinsPageProps) => {
  return <BasicList coins={coins} />;
};

CoinsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};

CoinsPage.getInitialProps = async () => {
  const arr: ICoin[] = [];

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

  return { coins: arr };
};

export default CoinsPage;
