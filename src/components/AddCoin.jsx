import React, { useState, useContext, useEffect } from "react";
import { WatchListContext } from "../context/watchListContext";
import coinGecko from "../apis/coinGecko";

const AddCoin = () => {
  const [coins, setCoins] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const { addCoin } = useContext(WatchListContext);
  const [isLoading, setIsLoading] = useState(false);
  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "bitcoin-cash",
    "litecoin",
    "eos",
    "okb",
    "tezos",
    "cardano",
  ];



  useEffect(() => {
    const fetchData = async () => {
      //setIsError(false);
      setIsLoading(true);
      

     
      const response = await coinGecko.get("/coins/markets/", {
        params: {
          vs_currency: "usd",
        },
      });

        console.log(response.data);
        setCoins(response.data);


      setIsLoading(false);
    };

    fetchData();
  }, [])



  
  const handleClick = (coin) => {
    addCoin(coin);
    setIsActive(false);
  };

  return (
    <div className="dropdown">
    <button
      onClick={() => setIsActive(!isActive)}
      className="btn btn-primary dropdown-toggle"
      type="button"
    >
      Add Coin
    </button>
    <div className={isActive ? "dropdown-menu show" : "dropdown-menu"}>
    {coins.map((el) => {
        return (
          <a
            onClick={() => handleClick(el.id)}
            href="#"
            className="dropdown-item"
          >
            {el.id}
          </a>
        );
      })}
    </div>
  </div>
  );
};

export default AddCoin;
