/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { useTypedSelector } from 'hooks/useTypedSelector';
import Link from 'next/link';
import React from 'react';
import { IoRocketSharp } from 'react-icons/io5';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  toolbar: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  block: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '125px',
    },
  },
}));

const Sidebar: React.FC = () => {
  const classes = useStyles();
  const { sum } = useTypedSelector((state) => state.coins);
  const [allSum, setAllSum] = React.useState(0);

  React.useEffect(() => {
    let sumI = 0;

    if (sum)
      sum.map((i: any) => {
        sumI += i.id;
      });
    setAllSum(sumI);
  }, [sum]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.toolbar}>
          <Typography className={classes.block} variant="h6" noWrap>
            $ {allSum.toFixed(2)}
          </Typography>

          <Typography className={classes.title} variant="h6" noWrap>
            FlyToMoon
            <IoRocketSharp />
          </Typography>
          <IconButton
            edge="end"
            aria-label="search"
            color="inherit"
            className={classes.block}
          >
            <Link href="/coins">
              <SearchIcon />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Sidebar;
