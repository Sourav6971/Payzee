import { useEffect, useState } from "react";

export function useDebounce(inputValue) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);
  useEffect(() => {
    const value = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 200);
    return () => {
      clearTimeout(value);
    };
  }, [inputValue]);
  return debouncedValue;
}
