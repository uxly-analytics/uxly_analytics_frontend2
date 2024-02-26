import * as React from "react";
import { DataGrid, GridColDef} from "@mui/x-data-grid";

interface TransactionTableProps {
  walletData: {
    transactions: any[];
  };
}

const TransactionTable: React.FC<TransactionTableProps> = ({ walletData }) => {
  const columns: GridColDef[] = [
    { field: "from_address", headerName: "From Address", width: 375 },
    { field: "to_address", headerName: "To Address", width: 375 },
    { field: "value", headerName: "Value", width: 200 },
    { field: "decimal_value", headerName: "Decimal Value", width: 200 },
    {
      field: "block_timestamp",
      headerName: "Block Timestamp (+0)",
      width: 200,
    },
    { field: "block_hash", headerName: "Block Hash", width: 550 },
  ];

  const rows = walletData.transactions.map((transaction, index) => ({
    id: index,
    from_address: transaction.from_address,
    to_address: transaction.to_address,
    value: transaction.value,
    decimal_value: transaction.decimal_value,
    block_timestamp: transaction.block_timestamp,
    block_hash: transaction.block_hash,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        // ... other DataGrid properties as needed
      />
    </div>
  );
};

export default TransactionTable;

//export default function DataTable() {
//  return (
//    <div style={{ height: 400, width: "100%" }}>
//      <DataGrid
//        rows={rows}
//        columns={columns}
//        initialState={{
//          pagination: {
//            paginationModel: { page: 0, pageSize: 5 },
//          },
//        }}
//        pageSizeOptions={[5, 10]}
//        checkboxSelection
//      />
//    </div>
//  );
//}
