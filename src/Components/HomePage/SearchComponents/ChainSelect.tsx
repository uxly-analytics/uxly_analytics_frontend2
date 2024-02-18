import React from 'react';
import Select from 'react-select';

interface Chain{
  value: string;
  label: string;
}

interface ChainSelectProps {
  value: Chain;
  onChange: (chain: Chain) => void;
}

// Options for the dropdown
function getChainOptions(): Chain[] {
  return [
      { value: '0x1', label: 'ETH' },
      { value: "0x5", label: "Goerli" },
      { value: "0xaa36a7", label: "Sepolia" },
      { value: "0x89", label: "Polygon" },
      { value: "0x13881", label: "Mumbai" },
      { value: "0x38", label: "BSC" },
      { value: "0x61", label: "BSC testnet" },
      { value: "0xa86a", label: "Avalanche" },
      { value: "0xfa", label: "Fantom" },
      { value: "0x2a15c308d", label: "Palm" },
      { value: "0x19", label: "Cronos" },
      { value: "0xa4b1", label: "Arbitrum" },
      { value: "0x64", label: "Gnosis" },
      { value: "0x27d8", label: "Gnosis testnet" },
      { value: "0x15b38", label: "Chiliz" },
      { value: "0x15b32", label: "Chiliz testnet" },
      { value: "0x2105", label: "Base" },
      { value: "0x14a33", label: "Base testnet" },
      { value: "0xa", label: "Optimism" },
    // Add more options as needed
  ];
}

function ChainSelect({ value, onChange }: ChainSelectProps): JSX.Element {
  function handleChainChange(selectedChain: Chain | null): void {
    if (selectedChain){
      onChange(selectedChain);
    }
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '20px',
      width: '200px',
      marginRight: '10px',
      borderColor: '#EB5763',
      borderWidth: '2px',
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: 'black',
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: 'black',
    }),
  };

  const selectedOption = value && Object.values(value).every(val => val === "") ? null : value;

  return (
    <Select
      options={getChainOptions()}
      value={selectedOption}
      onChange={handleChainChange}
      placeholder="Select Chain"
      isSearchable
      required
      styles={customStyles}
    />
  );
}

export default ChainSelect;