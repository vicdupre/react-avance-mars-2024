import { useState, useEffect, Dispatch, SetStateAction } from "react";

function usePersitedState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(() => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}

export default usePersitedState;
