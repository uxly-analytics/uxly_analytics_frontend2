import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";

interface WalletData {
  transactionsData: {
    chain: string;
    inbound_value: number;
    inbound_count: number;
    inbound_mean: number;
    outbound_value: number;
    outbound_count: number;
    outbound_mean: number;
  }[];
}
interface GrandTotals {
  [key: string]: {
    chain: string;
    inbound_value: number;
    inbound_count: number;
    inbound_mean: number;
    outbound_value: number;
    outbound_count: number;
    outbound_mean: number;
  };
}

interface MultipleTransactionTableProps {
  wallets: WalletData[];
}

const MultipleTransactionTable: React.FC<MultipleTransactionTableProps> = ({
  wallets,
}) => {
  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "chain", headerName: "Chain", width: 150 },
    { field: "inbound_value", headerName: "Total Inbound Value", width: 200 },
    { field: "inbound_count", headerName: "Total Inbound Count", width: 150 },
    { field: "inbound_mean", headerName: "Inbound Mean Value", width: 200 },
    { field: "outbound_value", headerName: "Total Outbound Value", width: 200 },
    { field: "outbound_count", headerName: "Total Outbound Count", width: 150 },
    { field: "outbound_mean", headerName: "Outbound Mean Value", width: 200 },
  ];

  // Calculate grand totals for all wallets
  const grandTotals: GrandTotals = wallets.reduce((acc, wallet) => {
    wallet.transactionsData.forEach((transaction) => {
      const chain = transaction.chain;

      if (!acc[chain]) {
        acc[chain] = {
          chain: chain,
          inbound_value: 0,
          inbound_count: 0,
          inbound_mean: 0,
          outbound_value: 0,
          outbound_count: 0,
          outbound_mean: 0,
        };
      }

      acc[chain].inbound_value += transaction.inbound_value;
      acc[chain].inbound_count += transaction.inbound_count;
      acc[chain].outbound_value += transaction.outbound_value;
      acc[chain].outbound_count += transaction.outbound_count;
    });

    return acc;
  }, {} as GrandTotals);

  // Calculate means
  Object.values(grandTotals).forEach((totals) => {
    totals.inbound_mean =
      totals.inbound_count > 0
        ? totals.inbound_value / totals.inbound_count
        : 0;
    totals.outbound_mean =
      totals.outbound_count > 0
        ? totals.outbound_value / totals.outbound_count
        : 0;
  });

  // Format grand totals into rows for DataGrid
  const rows = Object.values(grandTotals).map((row, index) => ({
    id: index,
    ...row,
  }));

  return (
    <Grid item xs={12}>
      <BoxWrapper
        title="Transaction Data"
        titleSX={{ textAlign: "center", mb: 3 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          style={{
            backgroundClip: "content-box",
            borderRadius: "20px",
            textOverflow: "ellipsis",
            background: "#3D3D3D",
            border: "1px solid white",
          }}
          disableRowSelectionOnClick
          sx={[
            {
              border: "none",
              outline: "none",
            },
            {
              "& .MuiDataGrid-cell": {
                border: "none",
              },
            },
            {
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
                border: "none",
              },
            },
            {
              "& .MuiDataGrid-row": {
                background: "#3D3D3D",
                border: 0,
                color: "white",
              },
            },
            {
              "& .MuiDataGrid-row:hover": {
                bgcolor: "#1F1F1F",
              },
            },
            {
              "& .MuiDataGrid-cell:hover": {
                bgcolor: "#1F1F1F",
              },
            },
            {
              "& .inbound .Mui-selected": {
                bgcolor: "rgb(230, 245, 230) !important",
              },
              "& .inbound .Mui-selected:hover": {
                bgcolor: "rgb(225, 245, 225) !important",
              },
            },
            {
              "& .outbound .Mui-selected": {
                bgcolor: "rgb(245, 230, 230) !important",
              },
              "& .outbound .Mui-selected:hover": {
                bgcolor: "rgb(245, 225, 225) !important",
              },
            },
            {
              "& .Mui-hovered": {
                bgcolor: "rgb(232, 232, 232)",
              },
            },
            {
              "& .MuiDataGrid-columnHeader": {
                fontWeight: "bold !important",
                bgcolor: "inherit",
                border: "none",
                color: "white",
              },
            },
            {
              "& .MuiDataGrid-footerContainer": {
                border: "none",
                background: "#1F1F1F",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              },
            },
            {
              "& .MuiToolbar-root": {
                color: "#9E9E9E",
              },
            },
          ]}
          // ... other DataGrid properties as needed
        />
      </BoxWrapper>
    </Grid>
  );
};

export default MultipleTransactionTable;
