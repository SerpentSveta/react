import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getLocalStorageValue = (): T => {
    const storageValue = localStorage.getItem(key);

    if (storageValue) {
      try {
        return JSON.parse(storageValue);
      } catch {
        return initialValue;
      }
    }

    return initialValue;
  };

  const [value, setValue] = useState(getLocalStorageValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
