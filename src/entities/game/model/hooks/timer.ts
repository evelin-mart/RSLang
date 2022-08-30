import React from 'react';

type EndHandler = () => void;

export const useTimer = (seconds: number): [typeof startTimer, typeof stopTimer, number] => {
  const [counter, setCounter] = React.useState(0);
  const timer = React.useRef<ReturnType<typeof setTimeout>>();
  const endHandlerRef = React.useRef<EndHandler>();
  
  const stopTimer = React.useCallback(() => {
    clearInterval(timer.current);
    setCounter(0);
  }, []);

  const startTimer = React.useCallback((endHandler: EndHandler) => {
    endHandlerRef.current = endHandler;
    timer.current = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
  }, []);

  React.useEffect(() => {
    if (counter === seconds && endHandlerRef.current) {
      endHandlerRef.current();
      stopTimer();
    }
  }, [counter, seconds, stopTimer]);

  return [
    startTimer, stopTimer, counter
  ]
}