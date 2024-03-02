import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";
import AvalancheLogo from "../../../HomeComponents/images/Avalanche.png";
import EthereumLogo from "../../../HomeComponents/images/Ethereum.png";
import AndroidLogo from "../../../HomeComponents/images/android.png";
import FranceFlag from "../../../HomeComponents/images/france-flag.png";

const AudienceGrowth: React.FC = () => {
  return (
    <Grid item xs={12}>
      <BoxWrapper
        title="Audience Growth"
        boxSX={{ border: 0 }}
        titleSX={{ textAlign: "center", mb: 9 }}
      >
        <Grid container item spacing={3} height="100%">
          <Grid item xs={12}>
            <BoxWrapper
              title="Your audience is growing!"
              titleSX={{ fontSize: 36 }}
              boxSX={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              value="66%"
              valueSX={{ color: "#01A643", fontSize: 96 }}
            />
          </Grid>
          <Grid item xs={6}>
            <BoxWrapper title="Wallet Info" titleSX={{ mb: 3 }}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Box
                  component="img"
                  width={75}
                  height={75}
                  src={AvalancheLogo}
                  sx={{ objectFit: "contain" }}
                />
                <Typography color="white" fontSize="36px">
                  %43 of your audience has more than 3 AVAX
                </Typography>
              </Stack>
            </BoxWrapper>
          </Grid>
          <Grid item xs={6}>
            <BoxWrapper title="Device Usage" titleSX={{ mb: 3 }}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Box
                  component="img"
                  width={75}
                  height={75}
                  src={EthereumLogo}
                  sx={{ objectFit: "contain" }}
                />
                <Typography color="white" fontSize="36px">
                  %13 of your audience has more than 50 USDT
                </Typography>
              </Stack>
            </BoxWrapper>
          </Grid>
          <Grid item xs={6}>
            <BoxWrapper title="Country" titleSX={{ mb: 3 }}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Box
                  component="img"
                  width={75}
                  height={75}
                  src={AndroidLogo}
                  sx={{ objectFit: "contain" }}
                />
                <Typography color="white" fontSize="36px">
                  %55 of your audience uses ANDROID
                </Typography>
              </Stack>
            </BoxWrapper>
          </Grid>
          <Grid item xs={6}>
            <BoxWrapper title="Country" titleSX={{ mb: 3 }}>
              <Stack direction="row" spacing={3} alignItems="center">
                <Box
                  component="img"
                  width={75}
                  height={75}
                  sx={{ objectFit: "contain" }}
                  src={FranceFlag}
                />
                <Typography color="white" fontSize="36px">
                  Your audience growing in FRANCE %5
                </Typography>
              </Stack>
            </BoxWrapper>
          </Grid>
        </Grid>
      </BoxWrapper>
    </Grid>
  );
};

export default AudienceGrowth;
