/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-mixed-operators */
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';
import { ICoin } from 'types/coins';

import SimpleModal from './modal';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  red: {
    backgroundColor: 'red',
    borderRadius: 3,
    padding: '0 2px',
  },
  green: {
    backgroundColor: 'green',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    padding: '0 2px',
  },
});

interface RowProps {
  coin: ICoin;
}

const Row: React.FC<RowProps> = ({ coin }) => {
  const { name, symbol, priceUSD, percentChange24h, id } = coin;
  const [open, setOpen] = React.useState(false);

  const [holdings, setHoldings] = React.useState<number>(0);
  const [netCosts, setNetCosts] = React.useState<number>(0);
  const classes = useRowStyles();
  const { transactions } = useTypedSelector((state) => state.coins);
  const { addSum } = useActions();

  const marketValue = ((holdings * priceUSD) / netCosts - 1) * 100;

  React.useEffect(() => {
    addSum({ id, sum: holdings * priceUSD - netCosts });
  }, [holdings, id, netCosts, priceUSD]);

  React.useEffect(() => {
    let sumHoldings = 0;
    let sumNetCosts = 0;

    transactions.map((item) => {
      if (item.id === id) {
        sumHoldings += item.holdings;
        sumNetCosts += item.holdings * item.currentPrice;

        setHoldings(+sumHoldings.toFixed(6));
        setNetCosts(+sumNetCosts.toFixed(2));
      }
    });
  }, [id, transactions]);

  return (
    <>
      <TableRow className={classes.root} hover={true}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {symbol}/USD ({name})
        </TableCell>
        <TableCell align="left">
          <Typography variant="body2" gutterBottom component="span">
            HOLDINGS
          </Typography>
          <br />
          <Typography variant="body2" gutterBottom component="span">
            <b> {holdings}</b>
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography noWrap variant="body2" gutterBottom component="span">
            NET COST
          </Typography>
          <br />
          <Typography variant="body2" gutterBottom component="span">
            <b>$ {netCosts}</b>
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography noWrap variant="body2" gutterBottom component="span">
            MARKET VALUE
          </Typography>
          <br />
          <Typography variant="body2" gutterBottom component="span">
            {marketValue ? <small>{marketValue.toFixed(2)}%</small> : ''}{' '}
            <b>{+(holdings * priceUSD).toFixed(2)}$</b>
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography variant="body2" gutterBottom component="span">
            PROFIT
          </Typography>
          <br />
          <Typography variant="body2" gutterBottom component="span">
            <b> {+(holdings * priceUSD - netCosts).toFixed(2)}$</b>
          </Typography>
        </TableCell>
        <TableCell
          align="left"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Grid
            container
            wrap="nowrap"
            justifyContent="center"
            spacing={0}
            style={{
              margin: '0 5px',
            }}
          >
            <Grid
              item
              style={{
                backgroundColor: '#ff8b8b',
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                padding: '0 2px',
              }}
            >
              24H
            </Grid>
            <Grid
              item
              className={percentChange24h < 0 ? classes.red : classes.green}
            >
              {percentChange24h > 0 && '+'}
              {percentChange24h.toFixed(2)}%
            </Grid>
          </Grid>
          {priceUSD.toFixed(2)}
          {percentChange24h > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {transactions.map((item, index) => {
                if (item.id === id) {
                  return (
                    <Typography
                      key={item.id.toString() + index.toString()}
                      variant="h6"
                      gutterBottom
                      component="div"
                    >
                      Quantity:{item.holdings} Price({item.currentPrice}$)
                    </Typography>
                  );
                }
              })}
              {!transactions.some((item) => item.id === id) && (
                <Typography variant="h6" gutterBottom component="div">
                  No transactions. Add new transaction to update your portfolio
                </Typography>
              )}
              <SimpleModal coin={coin} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
