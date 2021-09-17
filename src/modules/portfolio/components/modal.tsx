import { Modal, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useActions } from 'hooks/useActions';
import React from 'react';
import { ICoin } from 'types/coins';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

interface SimpleModalProps {
  coin: ICoin;
}
const SimpleModal: React.FC<SimpleModalProps> = ({ coin }) => {
  const [quantity, setQuantity] = React.useState('');
  const classes = useStyles();
  const { addTransaction } = useActions();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTransaction = () => {
    // if (localStorage.getItem('transactions')) {
    //   const data = JSON.parse(localStorage.getItem('transactions') as string);

    //   if (Array.isArray(data)) {
    //     data.map((item) => {
    //       if (item.id === coin.id) {
    //         const newItem = {
    //           ...item,
    //           holdings: +item.holdings + +quantity,
    //           netCosts: +quantity * coin.priceUSD + item.netCosts,
    //         };
    //         console.log('newItem', newItem);
    //         data.filter((item) => {
    //           if (item.id === coin.id) console.log(newItem);
    //           else console.log(item);
    //         });
    //       } else {
    //         data.push({
    //           id: coin.id,
    //           holdings: +quantity,
    //           netCosts: +quantity * coin.priceUSD,
    //         });
    //         localStorage.setItem('transactions', JSON.stringify(data));
    //       }
    //     });
    //     console.log(data);
    //   }
    // } else
    //   localStorage.setItem(
    //     'transactions',
    //     JSON.stringify([
    //       {
    //         id: coin.id,
    //         holdings: +quantity,
    //         netCosts: +quantity * coin.priceUSD,
    //       },
    //     ])
    //   );
    addTransaction({
      id: +coin.id,
      holdings: +quantity,
      currentPrice: +coin.priceUSD,
      //.toFixed(2)
    });

    handleClose();
    setQuantity('');
  };

  const body = (
    <div className={classes.paper}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Price ($)"
          value={coin.priceUSD.toFixed(2)}
        />
        <TextField
          id="standard-basic"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={saveTransaction}>
          Save transaction
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Add transaction
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default SimpleModal;
