
import { useState, useRef, useEffect } from "react";

function LapTimer() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef();

  const handleStart = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((time) => {
          return time + 10
        });

      }, 10);
    }
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    setLaps([]);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <div>{formatTime(time)}</div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleLap}>Lap</button>
      <button onClick={handleReset}>Reset</button>
      <ul>
        {laps.map((lapTime, index) => (
          <li key={index}>{formatTime(lapTime)}</li>
        ))}
      </ul>
    </div>
  );
}

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time - minutes * 60000) / 1000);
  const centiseconds = Math.floor(
    (time - minutes * 60000 - seconds * 1000) / 10
  );

  return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(
    centiseconds
  )}`;
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}
export default LapTimer;
