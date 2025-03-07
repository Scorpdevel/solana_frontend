import {useEffect, useState} from "react";
import './App.css'

type StatusType = {
    balance: number;
}

//https://solana-backend-aczn.onrender.com
function App() {
    const [status, setStatus] = useState<StatusType>({balance: -1});
    const startBot = async () => {
        try {
            const response = await fetch("https://solana-backend-aczn.onrender.com/start-bot", {
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
            const response = await fetch("https://solana-backend-aczn.onrender.com/stop-bot", {
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
            const response = await fetch("https://solana-backend-aczn.onrender.com/status");
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
        <button onClick={() => stopBot()}>stop</button>
        <h2>Summe:</h2>
        {status ? (
            <>
            <pre>{status.balance} SOL</pre>
            </>
        ) : (
            <p onClick={() => fetchStatus()}>⏳ Lade Status...</p>
        )}
        <button>Status Aktualisieren</button>
    </>
  )
}

export default App
