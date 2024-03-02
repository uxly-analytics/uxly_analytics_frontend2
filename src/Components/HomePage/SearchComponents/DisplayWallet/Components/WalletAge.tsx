import { Grid } from "@mui/material";
import React from "react";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";

const WalletAge: React.FC = () => {
  return (
    <Grid item xs={12}>
      <BoxWrapper title="Wallet Age" titleSX={{ textAlign: "center", mb: 9 }}>
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={2}>
            <BoxWrapper title="New" value="6235" />
          </Grid>
          <Grid item xs={2}>
            <BoxWrapper title="Young" value="434" />
          </Grid>
          <Grid item xs={2}>
            <BoxWrapper title="Medium" value="43" />
          </Grid>
          <Grid item xs={2}>
            <BoxWrapper title="Mature" value="766" />
          </Grid>
          <Grid item xs={2}>
            <BoxWrapper title="Established" value="545" />
          </Grid>
          <Grid item xs={2}>
            <BoxWrapper title="Veteran" value="43" />
          </Grid>
        </Grid>
      </BoxWrapper>
    </Grid>
  );
};

export default WalletAge;
