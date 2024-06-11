
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import '../displaywallet.css';
import { Grid } from '@mui/material';
import BoxWrapper from '../../../HomeComponents/BoxWrapper/BoxWrapper';

interface TransactionTableProps {
  walletData: {
    transactions: any[];
  };
  address: string;
}

// TODO: have a version for the db-transactions?? or just change the name of the
// db_transactions one / the normal one??? not sure which one is best as it will
// break in multiple places if i change the normal one - might just need to
// change the db-transactions one

const TransactionTable: React.FC<TransactionTableProps> = ({
  walletData,
  address,
}) => {
  console.log('walletData: ', walletData);
  console.log('address', address.toLowerCase());
  console.log(
    'walletData.transactions',
    walletData.transactions[0].fromAddress,
  );
  console.log(
    'walletData.transactions = address?',
    walletData.transactions[0].fromAddress === address.toLowerCase(),
  );
  const columns: GridColDef[] = [
    {
      field: 'fromAddress',
      headerName: 'From Address',
      flex: 1,
      headerClassName: 'transactionHeader',
    },
    {
      field: 'toAddress',
      headerName: 'To Address',
      flex: 1,
      headerClassName: 'transactionHeader',
    },
    {
      field: 'value',
      headerName: 'Value',
      flex: 1,
      headerClassName: 'transactionHeader',
    },
    {
      field: 'decimalValue',
      headerName: 'Decimal Value',
      flex: 1,
      headerClassName: 'transactionHeader',
    },
    {
      field: 'blockTimestamp',
      headerName: 'Block Timestamp (+0)',
      flex: 1,
      headerClassName: 'transactionHeader',
    },
    {
      field: 'blockHash',
      headerName: 'Block Hash',
      flex: 1,
      headerClassName: 'transactionHeader',
    },
  ];

  const rows = walletData.transactions.map((transaction, index) => ({
    id: index,
    fromAddress: transaction.fromAddress,
    toAddress: transaction.toAddress,
    value: transaction.value,
    decimalValue: transaction.decimalValue,
    blockTimestamp: transaction.blockTimestamp,
    blockHash: transaction.blockHash,
  }));

  return (
    <Grid item xs={12}>
      <BoxWrapper
        title="Transaction History"
        titleSX={{ textAlign: 'center', mb: 3 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          getRowClassName={(params) =>
            `${
              params.row.fromAddress === address.toLowerCase()
                ? 'outbound'
                : 'inbound'
            }`
          }
          style={{
            backgroundClip: 'content-box',
            borderRadius: '20px',
            textOverflow: 'ellipsis',
            background: '#3D3D3D',
            border: '1px solid white',
          }}
          sx={[
            {
              border: 'none',
              outline: 'none',
            },
            {
              '& .MuiDataGrid-cell': {
                border: 'none',
              },
            },
            {
              '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
                outline: 'none !important',
                border: 'none',
              },
            },
            {
              '& .MuiDataGrid-row': {
                background: '#3D3D3D',
                border: 0,
                color: 'white',
              },
            },
            {
              '& .MuiDataGrid-row:hover': {
                bgcolor: '#1F1F1F',
              },
            },
            {
              '& .MuiDataGrid-cell:hover': {
                bgcolor: '#1F1F1F',
              },
            },
            {
              '& .inbound .Mui-selected': {
                bgcolor: 'rgb(230, 245, 230) !important',
              },
              '& .inbound .Mui-selected:hover': {
                bgcolor: 'rgb(225, 245, 225) !important',
              },
            },
            {
              '& .outbound .Mui-selected': {
                bgcolor: 'rgb(245, 230, 230) !important',
              },
              '& .outbound .Mui-selected:hover': {
                bgcolor: 'rgb(245, 225, 225) !important',
              },
            },
            {
              '& .Mui-hovered': {
                bgcolor: 'rgb(232, 232, 232)',
              },
            },
            {
              '& .MuiDataGrid-columnHeader': {
                fontWeight: 'bold !important',
                bgcolor: 'inherit',
                border: 'none',
                color: 'white',
              },
            },
            {
              '& .MuiDataGrid-footerContainer': {
                border: 'none',
                background: '#1F1F1F',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
              },
            },
            {
              '& .MuiToolbar-root': {
                color: '#9E9E9E',
              },
            },
          ]}
        />
      </BoxWrapper>
    </Grid>
  );
};

export default TransactionTable;
