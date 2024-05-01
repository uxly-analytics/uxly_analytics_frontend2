import React, { useState, useEffect } from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import './home.css';

interface Chain {
  value: string;
  label: string;
}

interface WalletSelectorProps {
  addresses: string[];
  onCheckboxClick: (address: string, chain: Chain) => Promise<void>;
}

const WalletSelector: React.FC<WalletSelectorProps> = ({
  addresses,
  onCheckboxClick,
}) => {

  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);

  // Need useEffect to update state when addresses prop changes
  useEffect(() => {
    setSelectedAddresses(addresses);
    console.log('in selector, these are addresses:', addresses);
  }, [addresses, setSelectedAddresses]);

  // Function to handle checkbox click
  const handleCheckboxClick = (address: string) => {
    // Check if the address is already selected
    if (selectedAddresses.includes(address)) {
      // If selected, remove it from the selected addresses
      setSelectedAddresses(selectedAddresses.filter(item => item !== address));
    } else {
      // If not selected, add it to the selected addresses
      setSelectedAddresses([...selectedAddresses, address]);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Convert selected addresses array to a comma-separated string
    const selectedAddressesString = selectedAddresses.join(',');
    // Pass the selected addresses string and chain to the parent component
    console.log('this is the selected addresses we searching with', selectedAddressesString);
    onCheckboxClick(selectedAddressesString, { value: "", label: "" });
  };

  return (
    <div>
      <FormGroup>
        {addresses.map((wallet, index) => (
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={true}
                className="checkbox-root"
                onChange={() => handleCheckboxClick(wallet)}
              />
            }
            key={index}
            label={<span className="wallet-label">{wallet}</span>}
          />
        ))}
      </FormGroup>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default WalletSelector;
