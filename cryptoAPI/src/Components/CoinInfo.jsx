import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getCoinPrice = async () => {
      try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=`, {
          headers: {
            'Authorization': `Apikey ${API_KEY}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPrice(data[symbol]?.USD);
      } catch (error) {
        console.error('Error fetching price data: ', error);
      }
    };

    if (symbol) {
        getCoinPrice().catch(console.error);
    }
  }, [symbol]); 

  return (
    <div>
        {price ? (
            <li className="main-list" key={symbol}>
                <img
                    className="icons"
                    src={`https://www.cryptocompare.com${image}`}
                    alt={`Small icon for ${name} crypto coin`}
                />
                {name} <span className="tab">{price} USD</span>
            </li>
        ) : null}
    </div>
);
};

export default CoinInfo;
