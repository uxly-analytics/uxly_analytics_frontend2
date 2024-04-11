import React, { useState, ChangeEvent, FormEvent } from "react";
import "../HomeComponents/home.css";
import ChainSelect from "./ChainSelect";
import { Box, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Chain {
  value: string;
  label: string;
}

interface SearchForm {
  onSubmit: (address: string[], chain: Chain) => void;
}

function Search({ onSubmit }: SearchForm): JSX.Element {
  const [address, setAddress] = useState<string[]>([]);
  const [chain, setChain] = useState<Chain>({ value: "", label: "" });
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const fileInputRef = React.createRef<HTMLInputElement>();

  function handleAddressChange(e: ChangeEvent<HTMLInputElement>): void {
    const addresses: string = e.target.value;
    const addressesArray: string[] = addresses
      .split(",")
      .map((address) => address.trim());
    setAddress(addressesArray);
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      setFileName(uploadedFile.name);
      setFileUploaded(true);
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const csvData: string = event.target.result as string;
          // Split CSV data by newline
          const lines: string[] = csvData.split("\n");
          // Process each line
          const addressesArray: string[] = lines
            .flatMap((line) => line.split(",").map((item) => item.trim()))
            .filter((item) => item !== "");
          setAddress(addressesArray);
        }
      };

      reader.readAsText(uploadedFile);
    }
  }

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    onSubmit(address, chain);
  }

  function handleRetry(): void {
    setFileUploaded(false);
    setFileName("");
    setAddress([]); // Clear the address input
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      {fileUploaded ? (
        <div>
          <Typography variant="subtitle1" color="white">
            {fileName}
          </Typography>
          <button type="button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      ) : (
        <>
          <label htmlFor="file-upload" className="file-upload-button">
            <AddIcon />
            Upload File
          </label>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept=".csv"
            style={{ display: "none" }}
            required={!address.length}
          />
        </>
      )}
      {!fileUploaded && (
        <Box width="100%" display="flex">
          <Stack>
            <Typography
              variant="body2"
              color="white"
              mb={0.5}
              textAlign="initial"
            >
            </Typography>
            <TextField
              type="text"
              placeholder="Enter Wallet Address"
              value={address}
              onChange={handleAddressChange}
              required={!fileUploaded}
              sx={{
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    background: "none",
                  },
                },
                "& fieldset": { border: "none" },
                border: "1px solid #EB5763",
                borderRadius: 100,
                width: 625,
                boxShadow: "none",
              }}
              InputProps={{
                endAdornment: <ChainSelect value={chain} onChange={setChain} />,
                disableUnderline: true,
                style: {
                  color: "white",
                  background: "inherit",
                },
              }}
            />
          </Stack>
        </Box>
      )}
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
