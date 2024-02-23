import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons'; // Import gold coin icon from Font Awesome

function GoldCoin({ points }) {
  return (
    <span className="text-yellow-500">
      <FontAwesomeIcon icon={faCoins} className="mr-1" />
      {points}
    </span>
  );
}

export default GoldCoin;