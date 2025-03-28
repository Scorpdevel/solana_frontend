import {useEffect, useState} from "react";
import './App.css'

type StatusType = {
    balance: number;
}

const telegramBotApiProd = 'https://solana-backend-aczn.onrender.com'
//const telegramBotApiDev = 'http://localhost:8081'

const tradingApiProd = 'https://solana-backend-trading.onrender.com'
//const tradingApiDev = 'http://localhost:8000'
function App() {
    const [status, setStatus] = useState<StatusType>({balance: -1});
    const startBot = async () => {
        try {
            const response = await fetch(`${telegramBotApiProd}/start-bot`, {
                method: "POST",
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    const stopBot = async () => {
        try {
            const response = await fetch(`${telegramBotApiProd}/stop-bot`, {
                method: "POST",
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    const stopTracking = async () => {
        try {
            const response = await fetch(`${tradingApiProd}/stop-tracking`, {
                method: "POST",
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Fehler:", error);
        }
    };

    const fetchStatus = async () => {
        try {
            const response = await fetch(`${tradingApiProd}/status`);
            const data = await response.json();
            console.log(data)
            setStatus(data);
            alert('Summe wurde aktualisiert');
        } catch (error) {
            console.error("Fehler beim Abrufen des Status:", error);
        }
    };


    useEffect(() => {
        fetchStatus()
    }, []);

    if(status.balance <= 0) return <>laed</>

  return (
      <>
          <button onClick={() => startBot()}>Start</button>
          <button onClick={() => stopBot()}>stop Telegram</button>
          <button onClick={() => stopTracking()}>stop Trading</button>
          <h2>Summe:</h2>
          {status ? (
              <>
                  <pre>{status.balance} $</pre>
              </>
          ) : (
              <p>⏳ Lade Status...</p>
          )}
          <button onClick={() => fetchStatus()}>Status Aktualisieren</button>
      </>
  )
}

export default App
