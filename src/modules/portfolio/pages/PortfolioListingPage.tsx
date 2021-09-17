/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Typography } from '@material-ui/core';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { ReactElement } from 'react';

import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import CollapsibleTable from '../components/table';

const PortfolioListingPage = () => {
  const { userCoins } = useTypedSelector((state) => state.coins);
  const { fetchQuotes } = useActions();

  React.useEffect(() => {
    let req = '';

    userCoins.map((item) => {
      if (!req) req = `${item.id}`;
      else req += `,${item.id}`;
    });

    if (req) fetchQuotes(req);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {userCoins.length === 0 ? (
        <Typography variant="h5" component="h5" align="center">
          Welcome to crypto portfolio manager.
          <br /> Use search on the right to add coins to your portfolio
        </Typography>
      ) : (
        <CollapsibleTable userCoins={userCoins} />
      )}
    </>
  );
};

PortfolioListingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Sidebar />
      {page}
    </Layout>
  );
};

export default PortfolioListingPage;
