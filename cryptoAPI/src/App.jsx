import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import './App.css';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);

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
        console.error('Error fetching data: ', error);
      }
    };

    fetchAllCoinData().catch(console.error);
  }, []);

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <ul>
        {list && Object.entries(list.Data).map(([key, value]) => 
          value.PlatformType === "blockchain" ? (
            <li key={key}>{value.FullName}</li>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default App;
