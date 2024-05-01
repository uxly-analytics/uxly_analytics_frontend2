import React from "react";
import Select from "react-select";

interface Chain {
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
    { value: "0x1", label: "ETH" },
    { value: "0x5", label: "Goerli" },
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
    if (selectedChain) {
      onChange(selectedChain);
    }
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: "20px",
      width: "200px",
      marginRight: "10px",
      background: "none",
      border: 0,
      boxShadow: "none",
      flexDirection: "row-reverse",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    menuList: (provided: any) => ({
      ...provided,
      background: "#28292A",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isSelected ? "#EB5763" : "none",
      "&:hover": {
        background: "#f57882",
      },
    }),
  };

  const selectedOption =
    value && Object.values(value).every((val) => val === "")
      ? { value: "0x1", label: "ETH" }
      : value;

  return (
    <Select
      options={getChainOptions()}
      value={selectedOption}
      defaultValue={{ value: "0x1", label: "ETH" }}
      onChange={handleChainChange}
      placeholder="Select Chain"
      isSearchable
      required
      styles={customStyles}
      components={{
        IndicatorSeparator: () => null,
      }}
    />
  );
}

export default ChainSelect;
