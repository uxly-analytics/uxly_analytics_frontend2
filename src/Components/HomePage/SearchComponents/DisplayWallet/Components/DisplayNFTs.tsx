import React, { useState, useEffect } from "react";
import TruncatedText from "./TruncateText";
import "../displaywallet.css";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import WidgetBox from "../../../HomeComponents/WidgetBox/WidgetBox";

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
  const videoExtensions = /\.(mp4|webm|ogg|ogv)$/i;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <WidgetBox title="NFT'S" titleSX={{ textAlign: "center", mb: 3 }}>
      <Grid container spacing={3}>
        {walletData.nft.map((obj: any, index: string) => (
          <Grid item xs={3} key={index}>
            <Card sx={{ background: "#3D3D3D", height: "100%" }}>
              {obj.image && (
                <CardMedia
                  sx={{ height: 265 }}
                  image={
                    obj.image.startsWith("ipfs://")
                      ? `https://ipfs.io/ipfs/${obj.image.slice(7)}`
                      : obj.image
                  }
                  title={obj.name}
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
    </WidgetBox>
  );
};

export default DisplayNFTs;
