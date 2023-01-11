import {useState, useEffect} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [USD, setUSD] = useState(0);
  const [conversion, setConversion] = useState(0);
  const [cost, setCost] = useState(0);
  const onSelected = (event) => {
    console.dir(event);    
    setCost(coins[event.target.selectedIndex].quotes.USD.price);
    console.log(cost);
  }
  const onSubmit = (event) => {
    event.preventDefault();
    setConversion(USD/cost);
  }
  const onChange = (event) => {
    setUSD(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json); 
      setLoading(false);
    });
  }, [])
  return (
  <div>
    <h1>The Coins!</h1>
    {loading ? <strong>Loading...</strong> : (
      <select onChange={onSelected}>
      {coins.map((coin) => (<option value={cost}>{coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD</option>))}
      </select>
    )}
    <hr/>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={USD} type="number" placeholder="$USD"/>
      <button>Convert</button>
      <br />
      <input value={conversion} type="number" placeholder="Coin Conversion"/>
    </form>
  </div>
  );
} 

export default App;
