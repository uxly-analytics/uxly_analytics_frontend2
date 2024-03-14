import React, { useState } from "react";
import "../displaywallet.css";
import { Card, CardContent, CardMedia, Grid, Typography, Button } from "@mui/material";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";
import PlaceholderImage from "../../../HomeComponents/images/placeholder-img.png";

interface WalletData {
  address: string;
  networth: any;
  nfts: any;
  tokenBalance: any;
  transactions: any;
  transactionsData: any;
}

const DisplayNFTs: React.FC<{ walletData: WalletData }> = ({ walletData }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(walletData.nfts.nfts.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Grid item xs={12}>
      <BoxWrapper title="NFT'S" titleSX={{ textAlign: "center", mb: 3 }}>
        <Grid container item spacing={3}>
          {walletData.nfts.nfts.slice(startIndex, endIndex).map((obj: any, index: string) => (
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
        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Button onClick={handlePrevPage} disabled={page === 1} sx={{ color: 'white', bgcolor: 'rgb(218, 97, 103)', ...(page === 1 && { bgcolor: 'transparent' }) }}>Previous</Button>
          <Typography variant="subtitle1" color="white" sx={{ margin: '0 10px' }}>Page {page}</Typography>
          <Button onClick={handleNextPage} disabled={page === totalPages} sx={{ color: 'white', bgcolor: 'rgb(218, 97, 103)', ...(page === totalPages && { bgcolor: 'transparent' }) }}>Next</Button>
        </Grid>
      </BoxWrapper>
    </Grid>
  );
};

export default DisplayNFTs;
