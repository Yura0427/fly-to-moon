import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useRouter } from 'next/router';
import React from 'react';
import { RiCoinLine } from 'react-icons/ri';
import { ICoin } from 'types/coins';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

interface CoinsPageProps {
  coins: ICoin[];
}
export default function BasicList({ coins }: CoinsPageProps) {
  const { userCoins } = useTypedSelector((state) => state.coins);
  const { addUserCoin } = useActions();
  const router = useRouter();

  const addCoin = (item: ICoin) => {
    addUserCoin(item);
    router.push('/');
  };
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {coins &&
        coins
          .filter((coin) => {
            return !userCoins.some((userCoin) => userCoin.id === coin.id);
          })
          .map((item) => {
            return (
              <ListItem button key={item.id} onClick={() => addCoin(item)}>
                <ListItemIcon>
                  <RiCoinLine />
                </ListItemIcon>
                <ListItemText primary={`${item.symbol} (${item.name})`} />
              </ListItem>
            );
          })}
    </List>
  );
}
