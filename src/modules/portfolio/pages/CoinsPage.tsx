import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { ReactElement } from 'react';

import Layout from '../components/layout';
import BasicList from '../components/list';
import Sidebar from '../components/sidebar';

const CoinsPage = () => {
  const { allCoins } = useTypedSelector((state) => state.coins);

  return <BasicList coins={allCoins} />;
};

CoinsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};

export default CoinsPage;
