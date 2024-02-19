import React, { useState } from 'react';
import "./displaywallet.css";

interface TruncatedTextProps {
  text: string;
  maxLength: number;
}

function TruncatedText({ text, maxLength }: TruncatedTextProps): JSX.Element {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div onClick={handleClick} className="text-container" style={{ cursor: 'pointer' }}>
      {isClicked? (
        <div className="truncated-text">{text}</div>
      ) : (
        <div>{text.slice(0, maxLength)}{text.length > maxLength ? '...' : ''}</div>
      )}
    </div>
  );
}

export default TruncatedText;
