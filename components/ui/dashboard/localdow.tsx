'use client'; // This directive makes it a Client Component

import { useState, useEffect } from 'react';

const LocalDowDisplay = () => {
  const [localDow, setLocalTime] = useState<number | null>(null);

  useEffect(() => {
    // This code runs only in the browser, accessing the client's local time
    const updateDow = () => {
      const now = new Date();
      const timeString = now.getDay();
      setLocalTime(timeString);
    };

    updateDow(); // Set date initially
    const timerId = setInterval(updateDow, 60000); // Update every second

    return () => clearInterval(timerId); // Cleanup on unmount
  }, []);

  return localDow;
};

export default LocalDowDisplay;
