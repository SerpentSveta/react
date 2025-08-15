'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      try {
        setValue(JSON.parse(storageValue));
      } catch {
        setValue(initialValue);
      }
    }
  }, [key, initialValue]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
