import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getCoinPrice = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPrice(data.USD);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    getCoinPrice().catch(console.error);
  }, [symbol]);

  return (
    <div>
      {price ? (
        <li className="main-list" key={symbol}>
          <img
            className="icons"
            src={`https://www.cryptocompare.com${image}`}
            alt={`Icon for ${name}`}
          />
          <Link
            style={{ color: "white" }}
            to={`/coinDetails/${symbol}`}
          >
            {name} <span className="tab"></span>${price} USD
          </Link>
        </li>
      ) : null}
    </div>
  );
};

export default CoinInfo;
