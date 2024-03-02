import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "../displaywallet.css";
import { Grid } from "@mui/material";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";

interface TokenBalanceProps {
  data: any;
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ data }) => {
  console.log(data);
  const columns: GridColDef[] = [
    {
      field: "token",
      headerName: "Token",
      flex: 1,
    },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
    },
  ];

  const rows = data.map((item: any, index: number) => {
    return {
      id: index,
      token: item.substring(item.indexOf(" ") + 1),
      balance: item.substring(0, item.indexOf(" ")),
    };
  });

  return (
    <Grid item xs={12}>
      <BoxWrapper
        title="Token Balance"
        titleSX={{ textAlign: "center", mb: 3 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
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
        />
      </BoxWrapper>
    </Grid>
  );
};

export default TokenBalance;
