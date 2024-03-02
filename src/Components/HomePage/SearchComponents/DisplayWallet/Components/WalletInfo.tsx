import { Grid } from "@mui/material";
import React from "react";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";

const WalletInfo: React.FC = () => {
  return (
    <>
      <Grid item xs={6}>
        <BoxWrapper title="Wallet Value" value="$5,349,788" />
      </Grid>
      <Grid item xs={3}>
        <BoxWrapper title="Number of Wallet" value="1235" />
      </Grid>
      <Grid item xs={3}>
        <BoxWrapper title="Number of Active Users" value="132" />
      </Grid>
    </>
  );
};

export default WalletInfo;
