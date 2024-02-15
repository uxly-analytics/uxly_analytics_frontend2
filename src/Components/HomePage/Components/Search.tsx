import React, { useState, ChangeEvent, FormEvent } from 'react';
import "./home.css";
import ChainSelect from './ChainSelect';

interface SearchForm {
  onSubmit: (address: string, chain: string) => void;
}

function Search({ onSubmit }: SearchForm): JSX.Element {
  const [address, setAddress] = useState<string>('');
  const [chain, setChain] = useState<string>('');

  function handleAddressChange(e: ChangeEvent<HTMLInputElement>): void {
    setAddress(e.target.value);
  }

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    onSubmit(address, chain);
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div>
        <input
          type="text"
          placeholder="Wallet Address"
          value={address}
          onChange={handleAddressChange}
          required
        />
      </div>
        <ChainSelect
          value={chain}
          onChange={setChain}
        />
        <button type="submit">Search</button>
    </form>
  );
}

export default Search;