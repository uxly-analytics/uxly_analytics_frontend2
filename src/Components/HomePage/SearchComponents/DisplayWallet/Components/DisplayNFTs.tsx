import React, { useState } from "react";
import { Card, CardContent, CardMedia, Grid, Typography, Button } from "@mui/material";
import BoxWrapper from "../../../HomeComponents/BoxWrapper/BoxWrapper";
import PlaceholderImage from "../../../HomeComponents/images/placeholder-img.png";

interface WalletData {
  address: string;
  networth: any;
  nft: any[];
  tokenBalance: any;
  transactions: any;
  transactionsData: any;
}

const DisplayNFTs: React.FC<{ walletData: WalletData }> = ({ walletData }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const startIndex = page * itemsPerPage;
  const endIndex = (page + 1) * itemsPerPage;

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <Grid item xs={12}>
      <BoxWrapper title="NFT'S" titleSX={{ textAlign: "center", mb: 3 }}>
        <Grid container item spacing={3}>
          {walletData.nft.slice(startIndex, endIndex).map((obj, index) => (
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
        <Grid container justifyContent="center" alignItems="center" mt={2}>
          <Button
            variant="contained"
            disabled={page === 0}
            onClick={handlePrevPage}
            sx={{ backgroundColor: 'rgb(218, 97, 103)', color: 'white' ,
              '&:hover': {
                backgroundColor: 'rgba(218, 97, 103, 0.8)',
              }
            }}
          >
            Previous
          </Button>
          <Typography variant="body1" color="white" mx={2}>
            Page {page + 1}
          </Typography>
          <Button
            variant="contained"
            disabled={endIndex >= walletData.nft.length}
            onClick={handleNextPage}
            sx={{ backgroundColor: 'rgb(218, 97, 103)', color: 'white' ,
              '&:hover': {
                backgroundColor: 'rgba(218, 97, 103, 0.8)',
              }
            }}
          >
            Next
          </Button>
        </Grid>
      </BoxWrapper>
    </Grid>
  );
};

export default DisplayNFTs;
