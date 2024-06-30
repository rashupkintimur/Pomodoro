import { useEffect, useState } from "react";

export const useLocalStorageWithState = (key: string, defData: unknown) => {
  const [state, setState] = useState(() => {
    const localData = localStorage.getItem(key);

    return localData || defData;
  });

  useEffect(() => {
    localStorage.setItem(key, String(state));
  }, [key, state]);

  return [state, setState];
};
