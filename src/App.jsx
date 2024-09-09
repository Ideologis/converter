import { useState } from "react";
import "./index.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("CAD");
  const [convertAmount,setConvertAmount] = useState(null)
  const [toFlag, setToFlag] = useState(null);
  const[fromFlag,setFromFlag]=useState(null)
  useEffect(() => {
    const fetchConvert = async () => {
      try {
        const response = await axios.get(
          `https://api.frankfurter.app/latest?amount=${input}&from=${fromCurrency}&to=${toCurrency}`
        );
        setConvertAmount(response.data.rates[toCurrency]);
      } catch (error) {
        console.error("Error fetch data from API", error);
      }
    };
    fetchConvert();
  }, [input,fromCurrency,toCurrency]);
  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`);
        const countries = response.data;
        
        

        // Find the country based on the 'fromCurrency' and 'toCurrency'
        const fromCountry = countries.find(item => item.currencies && item.currencies[fromCurrency]);
        const toCountry = countries.find(country => country.currencies && country.currencies[toCurrency]);

        // Set the flag images if the country is found
        if (fromCountry) setFromFlag(fromCountry.flags.png);
        if (toCountry) setToFlag(toCountry.flags.png);
      } catch (error) {
        console.error("Error fetching country flags", error);
      }
    };

    // Fetch flags whenever currencies change
    fetchFlags();
  }, [fromCurrency, toCurrency]);
  function HandleInput(e) {
    setInput(e.target.value);
  }
  function HandleFromCurrency(e) {
    setFromCurrency(e.target.value);
  }
  function HandleToCurrency(e) {
    setToCurrency(e.target.value);
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="bg-slate-300 rounded-[30px]">
        <div className="grid place-items-center p-4">
          <h2 className="font-bold text-2xl m-3 text-blue-500">
            Currency Converter
          </h2>
          <p className="text-center">
            Check live rates,set rate alerts,receive
            <br /> notification and more
          </p>
        </div>
        <div className="board bg-slate-300 m-4">
          <div className="from flex items-center m-4">
            <div className="profile flex flex-col items-center">
              <h2>Amount</h2>
              <img src={fromFlag} alt="" />
            </div>
            <select
              className="m-4 "
              value={fromCurrency}
              onChange={HandleFromCurrency}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
            <input
              type="text"
              className="From"
              value={input}
              onChange={HandleInput}
            />
          </div>
          <hr />
          <div className="to  m-4 flex items-center">
            <div className="profile flex flex-col items-center">
              <h2>
                Converted <br />
                Amount
              </h2>
              <img src={toFlag} alt="" />
            </div>
            <select
              className="m-4 "
              value={toCurrency}
              onChange={HandleToCurrency}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
            <input
              type="text"
              className="To"
              value={convertAmount ? convertAmount : ""}
            />
          </div>
        </div>
        <div className="result"></div>
        <h2>@Ideologist </h2>
      </main>
    </div>
  );
}

export default App;
