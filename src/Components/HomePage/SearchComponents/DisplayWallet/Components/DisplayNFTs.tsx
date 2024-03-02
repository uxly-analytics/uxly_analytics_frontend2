import React from "react";
import "../displaywallet.css";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";
import PlaceholderImage from "../../../HomeComponents/images/placeholder-img.png";

interface WalletData {
  address: string;
  activeChainsSimplified: any;
  nativeBalance: any;
  nft: any;
  tokenBalance: any;
  transactions: any;
  transactionsData: any;
}

const DisplayNFTs: React.FC<{ walletData: WalletData }> = ({ walletData }) => {
  return (
    <Grid item xs={12}>
      <BoxWrapper title="NFT'S" titleSX={{ textAlign: "center", mb: 3 }}>
        <Grid container item spacing={3}>
          {walletData.nft.map((obj: any, index: string) => (
            <Grid item xs={3} key={index}>
              <Card sx={{ background: "#3D3D3D", height: "100%" }}>
                {obj.image ? (
                  <CardMedia
                    sx={{ height: 265 }}
                    image={
                      obj.image.startsWith("ipfs://")
                        ? `https://ipfs.io/ipfs/${obj.image.slice(7)}`
                        : obj.image
                    }
                    title={obj.name}
                  />
                ) : (
                  <CardMedia
                    sx={{ height: 265 }}
                    image={PlaceholderImage}
                    title={"placeholder"}
                  />
                )}
                <CardContent>
                  <Typography variant="subtitle1" color="white">
                    {obj.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </BoxWrapper>
    </Grid>
  );
};

export default DisplayNFTs;
