import React, { useState, useCallback } from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Button, TextField } from '@mui/material';
import BoxWrapper from '../../../../HomePage/HomeComponents/BoxWrapper/BoxWrapper';
import './displaymultiplewallet.css';

interface WalletData {
    address: string;
    networth: any;
    nft: any;
    tokenBalance: any;
    transactions: any;
    transactionsData: any;
}

interface WalletsFilterProps {
    wallets: WalletData[];
    onSaveChanges: (filteredWallets: WalletData[]) => void;
}

const WalletsFilter: React.FC<WalletsFilterProps> = ({ wallets, onSaveChanges }) => {
    const [checkedState, setCheckedState] = useState<boolean[]>(Array(wallets.length).fill(true));
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleCheckAll = useCallback(() => {
        setCheckedState(Array(wallets.length).fill(true));
    }, [wallets.length]);

    const handleUncheckAll = useCallback(() => {
        setCheckedState(Array(wallets.length).fill(false));
    }, [wallets.length]);

    const handleCheckboxChange = useCallback((index: number) => {
        setCheckedState(prevState => prevState.map((item, idx) => (idx === index ? !item : item)));
    }, []);

    const handleSaveChanges = () => {
        const checkedCount = checkedState.filter(checked => checked).length;
        if (checkedCount === 0) {
            // Display a message or perform an action indicating that at least one wallet should be checked
            alert("You need to check at least one wallet.");
        } else {
            const filteredWallets = wallets.filter((wallet, index) => checkedState[index]);
            onSaveChanges(filteredWallets);
        }
    };

    const filteredWallets = wallets.filter(wallet => wallet.address.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <BoxWrapper
            title="Wallets"
            titleSX={{ textAlign: 'center' }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                    label="Search Address"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        marginRight: '10px',
                        '& input': { color: 'white' },
                        '& label': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgb(218, 97, 103)', // <-- Set the outline color here
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgb(197, 88, 94)', // <-- Set hover state outline color
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(197, 88, 94)', // <-- Set focused state outline color
                            },
                        },
                    }}
                    InputProps={{ sx: { color: 'white' } }}
                    InputLabelProps={{ sx: { color: 'white', '&.Mui-focused': { color: 'white' } } }}
                />
                <Button
                    variant="contained"
                    onClick={handleCheckAll}
                    sx={{ 
                        backgroundColor: 'rgb(218, 97, 103)', 
                        color: 'white', 
                        marginRight: '8px',
                        '&:hover': {
                            backgroundColor: 'rgb(197, 88, 94)', // Slightly darker shade for hover
                        }
                    }}
                    aria-label="Check All Wallets"
                >
                    Check All
                </Button>
                <Button
                    variant="contained"
                    onClick={handleUncheckAll}
                    sx={{ 
                        backgroundColor: 'rgb(218, 97, 103)', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgb(197, 88, 94)', // Slightly darker shade for hover
                        }
                    }}
                    aria-label="Uncheck All Wallets"
                >
                    Uncheck All
                </Button>
            </Box>
            <Box sx={{ maxHeight: '450px', width: '450px', overflowY: 'auto' }}>
                <FormGroup>
                    {filteredWallets.map((wallet, index) => (
                        <FormControlLabel
                            key={wallet.address}
                            control={
                                <Checkbox
                                    checked={checkedState[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                    sx={{
                                        color: 'rgb(218, 97, 103)',
                                        '&.Mui-checked': {
                                            color: 'rgb(218, 97, 103)',
                                        },
                                    }}
                                />
                            }
                            label={wallet.address}
                            sx={{ color: 'white' }}
                        />
                    ))}
                </FormGroup>
            </Box>
            <Box sx={{ position: 'sticky', bottom: 0, width: '100%', textAlign: 'center', padding: '10px' }}>
                <Button
                    variant="contained"
                    onClick={handleSaveChanges}
                    sx={{ 
                        backgroundColor: 'rgb(218, 97, 103)', 
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgb(197, 88, 94)', // Slightly darker shade for hover
                        }
                    }}
                    aria-label="Save Changes"
                >
                    Save Changes
                </Button>
            </Box>
        </BoxWrapper>
    );
};

export default WalletsFilter;
