import { useState, useEffect, useRef } from 'react';

export function useTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const pause = () => {
    setIsRunning(false);
  };
  const play = () => {
    setIsRunning(true)
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= 1000) {
          setSeconds((s) => {
            if (s === 59) {
              setMinutes((m) => m + 1);
              return 0;
            }
            return s + 1;
          });
          setStartTime(Date.now());
        }
        setMilliseconds(elapsed % 1000);
      }, 1);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, startTime]);

  const start = (initialMilliseconds = 0) => {
    setIsRunning(true);
  const initialTime = Date.now() - initialMilliseconds;
  const initialSeconds = Math.floor(initialMilliseconds / 1000);
  const initialMinutes = Math.floor(initialSeconds / 60);

  setMinutes(initialMinutes);
  setSeconds(initialSeconds % 60);
  setMilliseconds(initialMilliseconds % 1000);
  setStartTime(initialTime);
  };

  return {
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: seconds < 10 ? `0${seconds}` : seconds,
    milliseconds: milliseconds < 10 ? `0${seconds}`:milliseconds,
    start,
    pause, 
    play
  };
}