import { Table, TableBody, TableContainer, Paper } from '@material-ui/core';
import React from 'react';
import { ICoin } from 'types/coins';

import Row from './tableRow';

interface CollapsibleTableProps {
  userCoins: ICoin[];
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = ({ userCoins }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {userCoins.map((coin) => (
            <Row key={coin.id} coin={coin} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
