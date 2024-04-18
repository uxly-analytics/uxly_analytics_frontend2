import React, { useState, ChangeEvent, FormEvent } from 'react';
import './home.css';
import ChainSelect from './ChainSelect';
import {
  Box,
  FormControl,
  InputLabel,
  Stack,
  TextField,
  Typography,
  Button
} from '@mui/material';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import InsightsIcon from '@mui/icons-material/Insights';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

interface Chain {
  value: string;
  label: string;
}

interface SearchForm {
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onSearchSubmit: (searchValue: string) => void;
}

function Search({ className, onSubmit, onSearchSubmit }: SearchForm): JSX.Element {
  const [address, setAddress] = useState<string[]>([]);
  const [chain, setChain] = useState<Chain>({ value: '', label: '' });
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [searchValue, setSearchValue] = useState('');

  const fileInputRef = React.createRef<HTMLInputElement>();

  function handleAddressChange(e: ChangeEvent<HTMLInputElement>): void {
    const addresses: string = e.target.value;
    const addressesArray: string[] = addresses.split(',').map((address) => address.trim());
    setAddress(addressesArray);
    setSearchValue(e.target.value);
  }

   // Clears the current search and potentially other related states
   function handleClearSearch(): void {
    setAddress([]);
    setSearchValue('');
    // Any other clear actions
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
          const lines: string[] = csvData.split('\n');
          // Process each line
          const addressesArray: string[] = lines
            .flatMap((line) => line.split(',').map((item) => item.trim()))
            .filter((item) => item !== '');
          setAddress(addressesArray);
        }
      };

      reader.readAsText(uploadedFile);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearchSubmit(searchValue.trim()); // Pass the trimmed search value to the parent
    }
  }

  function handleRetry(): void {
    setFileUploaded(false);
    setFileName('');
    setAddress([]); // Clear the address input
    handleClearSearch(); // Use the clear function here to reset the form
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
  }

  return (
    
    <div className={`center-content ${className}`}> {/* Use this div to ensure everything is centered */}
    <form onSubmit={handleSubmit} className={"search-form"}>
    <Stack spacing={2} alignItems="center">
      {!fileUploaded && (
  
          <Stack>
            <Typography
              variant="body2"
              color="white"
              mb={0.5}
              textAlign="initial"
            >
            </Typography>
            <Box mb={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <TextField
              type="text"
              placeholder="Search Smart Contract Address"
              value={searchValue} //address.join(',')}
              onChange={handleAddressChange}
              required={!fileUploaded}
              variant="outlined"
              fullWidth
              sx={{
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    background: 'none',
                  },
                  '& label': { // This targets the <label> element inside the TextField
                    fontSize: '24px', // Set the font size you want for the label
                  },
                },
                '& fieldset': { border: 'none' },
                border: '1px solid #EB5763',
                borderRadius: 100,
                width: 625,
                boxShadow: 'none',
                '& .MuiInput-underline:before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:after': {
                  borderBottom: 'none',
                },
                '.MuiInputBase-root': {
                  width: '100% !important', // Full width of its parent
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "#EB5763" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
        {address.length > 0 && (
          <Tooltip title="Clear">
            <IconButton
              onClick={handleClearSearch}
              size="small"
              edge="end"
              style={{
                width: '48px', // Explicit width
                background: 'transparent', // Transparent background
                padding: '0', // No padding around the icon
                margin: '0 8px', // Margins to the right of the icon
                minWidth: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: "0px solid #EB5763",
              }}
            >
              {/* Red "X" icon, assuming #EB5763 is the color you want for the icon */}
              <ClearIcon style={{ color: "#EB5763"}} />
            </IconButton>
          </Tooltip>
        )}
        <ChainSelect value={chain} onChange={setChain} />
      </Box>
                  
                ),
                disableUnderline: true,
                style: {
                  color: "white",
                  fontSize: '18px',
                  paddingTop: 0,
                  paddingLeft: 10, // Add padding to align text after the search icon
                  background: "inherit",
                },
              }}
            />
            </Box>
          </Stack>
          
      )}
    {!fileUploaded && (
     <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
      <button 
      type="submit"
      
      style={{ 
        fontSize: '18px', // Adjust button font size as needed
        padding: '8px 16px', // Example padding, adjust as needed
        display: 'inline-flex', // Using flexbox for centering content
        justifyContent: 'center', // Centers content horizontally
        alignItems: 'center', // Centers content vertically
        width: '50px', 
        marginRight: '20px'
      }}
      >Search</button>
        <Tooltip 
            title="Upload & search multiple streams"
            placement="top-start"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: '#1F1F1F', // Adjust the background color
                  fontSize: '1rem', // Adjust the font size
                }
              }
            }}
        >
          <label htmlFor="file-upload" className="file-upload-button"
                 style={{ 
                  fontSize: '16px',
                  display: 'inline-flex', // Using flexbox for centering content
                  justifyContent: 'center', // Centers content horizontally
                  alignItems: 'center',
                  padding: '6px 16px',
                  width: '200px', 
          }}>
            <InsightsIcon style={{ marginRight: '4px' }} />UXly Analytics
          </label>
          </Tooltip>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
           accept=".csv"
            style={{ display: 'none' }}
            required={!address.length}
          />
      </Box>
    )}

      {fileUploaded && (
        <div>
          <span>{fileName}</span>
          <button type="button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}
      
      </Stack>
    </form>
    </div>
  );
}

export default Search;
