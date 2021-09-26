/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Typography } from '@material-ui/core';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { CoinsActionTypes, ICoin } from 'types/coins';

import Layout from '../components/layout';
import Sidebar from '../components/sidebar';
import CollapsibleTable from '../components/table';

interface PageProps {
  allCoins: ICoin[];
  userCoinsSSR: ICoin[];
}

const PortfolioListingPage = ({ allCoins, userCoinsSSR }: PageProps) => {
  const router = useRouter();

  const { userCoins } = useTypedSelector((state) => state.coins);
  const dispatch = useDispatch();

  React.useEffect(() => {
    let req = '';

    allCoins
      ? dispatch({ type: CoinsActionTypes.FETCH_ALL_COINS, payload: allCoins })
      : dispatch({
          type: CoinsActionTypes.FETCH_COINS_ERR,
          payload: `FETCH_ALL_COINS_ERROR`,
        });
    userCoins.map((item) => {
      if (!req) req = `${item.id}`;
      else req += `,${item.id}`;
    });

    // if (req) fetchQuotes(req);
    userCoinsSSR.length > 0
      ? dispatch({ type: CoinsActionTypes.FETCH_COINS, payload: userCoinsSSR })
      : dispatch({
          type: CoinsActionTypes.FETCH_COINS_ERR,
          payload: `FETCH_COINS_ERR`,
        });
    if (userCoins.length > 0) router.push(`?${req}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCoins]);

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
