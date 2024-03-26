import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getCoinDetail = async () => {
      const detailsResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=${API_KEY}`
      );
      const descriptionResponse = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=${API_KEY}`
      );

      const details = await detailsResponse.json();
      const description = await descriptionResponse.json();

      setFullDetails({ numbers: details.DISPLAY[params.symbol.toUpperCase()].USD, textData: description.Data[params.symbol.toUpperCase()] });
    };

    getCoinDetail().catch(console.error);
  }, [params.symbol]);

  return (
    <div>
      {fullDetails && (
        <>
          <h1>{fullDetails.textData.FullName}</h1>
          <img
            src={`https://www.cryptocompare.com${fullDetails.textData.ImageUrl}`}
            alt={`Icon for ${fullDetails.textData.FullName}`}
          />
          <div>{fullDetails.textData.Description}</div>
          {/* You can include more details here */}
        </>
      )}
    </div>
  );
};

export default CoinDetail;
