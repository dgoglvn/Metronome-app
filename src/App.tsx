import { useState, useRef } from "react";
import { Howl } from "howler";
import "./App.css";
import SidebarNav from "./components/sidebarNav/SidebarNav";

function App() {
  const [tempo, setTempo] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeSignature, setTimeSignature] = useState();
  const [buttonText, setButtonText] = useState<string>("START");
  const intervalId = useRef(null);

  const handleTempoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(event.target.valueAsNumber);
  };

  const decrement = () => {
    const value = tempo - 1;
    setTempo(value);
  };

  const increment = () => {
    const value = tempo + 1;
    setTempo(value);
  };

  const playClick = () => {
    const sound = new Howl({
      src: ["../src/assets/button-16.mp3"],
    });
    sound.play();
  };

  const startMetronome = () => {
    const intervalMs = 60000 / tempo;
    intervalId.current = setInterval(playClick, intervalMs);
    setIsPlaying(true);
    setButtonText("STOP");
  };

  const stopMetronome = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    setIsPlaying(false);
    setButtonText("START");
  };

  const handleMetronome = () => {
    if (!isPlaying) {
      startMetronome();
    } else {
      stopMetronome();
    }
  };

  return (
    <div className="app">
      <SidebarNav />
      <div className="banner">
        <p>The Metronome</p>
      </div>
      <main>
        <div className="tempo-display">
          <span className="tempo">{tempo}</span>
          <span style={{ fontSize: "24px" }}> BPM</span>
        </div>
        <div className="tempo-container">
          <button onClick={decrement}>-</button>
          <input
            type="range"
            name="tempo"
            min={20}
            max={220}
            value={tempo}
            onChange={handleTempoChange}
          />
          <button onClick={increment}>+</button>
        </div>
        <div className="btn-container">
          <button className="play-btn" onClick={handleMetronome}>
            {buttonText}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
