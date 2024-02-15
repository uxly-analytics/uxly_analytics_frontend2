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
        { value: '0x1', label: 'eth: 0x1' },
        { value: "0x5", label: "goerli: 0x5" },
        { value: "0xaa36a7", label: "sepolia: 0xaa36a7" },
        { value: "0x89", label: "polygon: 0x89" },
        { value: "0x13881", label: "mumbai: 0x13881" },
        { value: "0x38", label: "bsc: 0x38" },
        { value: "0x61", label: "bsc testnet: 0x61" },
        { value: "0xa86a", label: "avalanche: 0xa86a" },
        { value: "0xfa", label: "fantom: 0xfa" },
        { value: "0x2a15c308d", label: "palm: 0x2a15c308d" },
        { value: "0x19", label: "cronos: 0x19" },
        { value: "0xa4b1", label: "arbitrum: 0xa4b1" },
        { value: "0x64", label: "gnosis: 0x64" },
        { value: "0x27d8", label: "gnosis testnet: 0x27d8" },
        { value: "0x15b38", label: "chiliz: 0x15b38" },
        { value: "0x15b32", label: "chiliz testnet: 0x15b32" },
        { value: "0x2105", label: "base: 0x2105" },
        { value: "0x14a33", label: "base testnet: 0x14a33" },
        { value: "0xa", label: "optimism: 0xa" },
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