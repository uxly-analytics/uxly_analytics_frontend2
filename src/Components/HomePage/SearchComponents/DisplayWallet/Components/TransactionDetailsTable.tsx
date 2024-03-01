import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "../displaywallet.css";
import { Grid } from "@mui/material";

interface TransactionDetailsTableProps {
  walletData: {
    transactionsData: any[];
  };
}

const TransactionDetailsTable: React.FC<TransactionDetailsTableProps> = ({
  walletData,
}) => {
  const columns: GridColDef[] = [
    {
      field: "chain",
      headerName: "Chain",
      flex: 1,
      headerClassName: "transactionHeader",
    },
    {
      field: "inbound_value",
      headerName: "In Val",
      description: "Inbound Value",
      flex: 1,
      headerClassName: "transactionHeader",
      cellClassName: "inbound-cell",
    },
    {
      field: "inbound_count",
      headerName: "In Count",
      description: "Inbound Count",
      flex: 1,
      headerClassName: "transactionHeader",
      cellClassName: "inbound-cell",
    },
    {
      field: "inbound_mean",
      headerName: "Mean In Val",
      description: "Mean Inbound Value",
      flex: 1,
      headerClassName: "transactionHeader",
      cellClassName: "inbound-cell",
    },
    {
      field: "outbound_value",
      headerName: "Out Val",
      description: "Outbound Value",
      flex: 1,
      headerClassName: "transactionHeader",
      cellClassName: "outbound-cell",
    },
    {
      field: "outbound_count",
      headerName: "Out Count",
      description: "Outbound Count",
      flex: 1,
      headerClassName: "transactionHeader",
      cellClassName: "outbound-cell",
    },
    {
      field: "outbound_mean",
      headerName: "Mean Out Val",
      description: "Mean Outbound Value",
      flex: 1,
      headerClassName: "transactionHeader",
      cellClassName: "outbound-cell",
    },
  ];

  const rows = walletData.transactionsData.map((chainData, index) => ({
    id: index,
    chain: chainData.chain,
    inbound_value: chainData.inbound_value,
    inbound_count: chainData.inbound_count,
    inbound_mean: chainData.inbound_mean,
    outbound_value: chainData.outbound_value,
    outbound_count: chainData.outbound_count,
    outbound_mean: chainData.outbound_mean,
  }));
  // Filter out rows where only the numeric columns are all 0
  const filteredRows = rows.filter((row) => {
    // Exclude rows where only the numeric columns are all 0
    return (
      row.inbound_value !== 0 ||
      row.inbound_count !== 0 ||
      row.inbound_mean !== 0 ||
      row.outbound_value !== 0 ||
      row.outbound_count !== 0 ||
      row.outbound_mean !== 0
    );
  });
  return (
    <Grid item xs={12}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowClassName={(params) =>
          `${
            params.row.inbound_value < params.row.outbound_value
              ? "outbound"
              : params.row.inbound_value === params.row.outbound_value
              ? "equal"
              : "inbound"
          }`
        }
        style={{
          backgroundClip: "content-box",
          borderRadius: "20px",
          background: "#3D3D3D",
        }}
        sx={[
          {
            border: 5,
            borderColor: "#EB5763",
          },
          {
            "& .MuiDataGrid-row:hover": {
              bgcolor: "rgb(240, 240, 255)",
            },
          },
          {
            "& .MuiDataGrid-cell:hover": {
              bgcolor: "rgb(239, 239, 255)",
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
              bgcolor: "#EB5763",
            },
          },
        ]}
      />
    </Grid>
  );
};

export default TransactionDetailsTable;
