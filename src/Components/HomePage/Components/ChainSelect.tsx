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
        { value: 'eth', label: 'eth' },
        { value: "0x1", label: "0x1" },
        { value: "goerli", label: "goerli" },
        { value: "0x5", label: "0x5" },
        { value: "sepolia", label: "sepolia" },
        { value: "0xaa36a7", label: "0xaa36a7" },
        { value: "polygon", label: "polygon" },
        { value: "0x89", label: "0x89" },
        { value: "mumbai", label: "mumbai" },
        { value: "0x13881", label: "0x13881" },
        { value: "bsc", label: "bsc" },
        { value: "0x38", label: "0x38" },
        { value: "bsc testnet", label: "bsc testnet" },
        { value: "0x61", label: "0x61" },
        { value: "avalanche", label: "avalanche" },
        { value: "0xa86a", label: "0xa86a" },
        { value: "fantom", label: "fantom" },
        { value: "0xfa", label: "0xfa" },
        { value: "palm", label: "palm" },
        { value: "0x2a15c308d", label: "0x2a15c308d" },
        { value: "cronos", label: "cronos" },
        { value: "0x19", label: "0x19" },
        { value: "arbitrum", label: "arbitrum" },
        { value: "0xa4b1", label: "0xa4b1" },
        { value: "gnosis", label: "gnosis" },
        { value: "0x64", label: "0x64" },
        { value: "gnosis testnet", label: "gnosis testnet" },
        { value: "0x27d8", label: "0x27d8" },
        { value: "chiliz", label: "chiliz" },
        { value: "0x15b38", label: "0x15b38" },
        { value: "chiliz testnet", label: "chiliz testnet" },
        { value: "0x15b32", label: "0x15b32" },
        { value: "base", label: "base" },
        { value: "0x2105", label: "0x2105" },
        { value: "base testnet", label: "base testnet" },
        { value: "0x14a33", label: "0x14a33" },
        { value: "optimism", label: "optimism" },
        { value: "0xa", label: "0xa" },
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