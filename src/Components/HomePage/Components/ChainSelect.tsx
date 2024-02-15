import React from 'react';
import Select from 'react-select';

interface ChainSelectProps {
  value: string;
  onChange: (chain: string) => void;
}

function ChainSelect({ value, onChange }: ChainSelectProps): JSX.Element {
  function handleChainChange(selectedOption: any): void {
    onChange(selectedOption.value);
  }

  // Options for the dropdown
  function getOptions(): { value: string; label: string }[] {
    return [
        { value: '0x1', label: 'eth' },
        { value: "0x5", label: "goerli" },
        { value: "0xaa36a7", label: "sepolia" },
        { value: "0x89", label: "polygon" },
        { value: "0x13881", label: "mumbai" },
        { value: "0x38", label: "bsc" },
        { value: "0x61", label: "bsc testnet" },
        { value: "0xa86a", label: "avalanche" },
        { value: "0xfa", label: "fantom" },
        { value: "0x2a15c308d", label: "palm" },
        { value: "0x19", label: "cronos" },
        { value: "0xa4b1", label: "arbitrum" },
        { value: "0x64", label: "gnosis" },
        { value: "0x27d8", label: "gnosis testnet" },
        { value: "0x15b38", label: "chiliz" },
        { value: "0x15b32", label: "chiliz testnet" },
        { value: "0x2105", label: "base" },
        { value: "0x14a33", label: "base testnet" },
        { value: "0xa", label: "optimism" },
      // Add more options as needed
    ];
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

  const selectedValue = value === "" ? null : { value: value, label: value };

  return (
    <Select
      options={getOptions()}
      value={selectedValue}
      onChange={handleChainChange}
      placeholder="Select Chain"
      isSearchable
      required
      styles={customStyles}
    />
  );
}

export default ChainSelect;