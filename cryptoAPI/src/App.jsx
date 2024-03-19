import { useState, useEffect } from 'react';
import CoinInfo from "./Components/CoinInfo"; // Adjust the import path as necessary
import viteLogo from '/vite.svg';
import './App.css';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch('https://min-api.cryptocompare.com/data/all/coinlist?&api_key', {
          headers: {
            'Authorization': `Apikey ${API_KEY}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.entries(list?.Data || {}).filter(([key, value]) =>
        value.CoinName.toLowerCase().includes(searchValue.toLowerCase()) ||
        value.Symbol.toLowerCase().includes(searchValue.toLowerCase())
      ).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list?.Data);
    }
  };

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      <ul>
        {searchInput.length > 0
          ? Object.entries(filteredResults).map(([key, value]) =>
              value.PlatformType === "blockchain" ? 
              <CoinInfo
                key={value.Symbol}
                image={value.ImageUrl}
                name={value.CoinName}
                symbol={value.Symbol}
              />
              : null
            )
          : list && Object.entries(list.Data).map(([key, value]) => 
              value.PlatformType === "blockchain" ? 
              <CoinInfo
                key={value.Symbol}
                image={value.ImageUrl}
                name={value.CoinName}
                symbol={value.Symbol}
              />
              : null
            )}
      </ul>
    </div>
  );
}

export default App;
