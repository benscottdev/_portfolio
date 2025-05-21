import React, { useEffect, useState } from "react";

function LiveClock({ locale = "en-AU", timeZone = "Australia/Sydney" }) {
  const [time, setTime] = useState(
    new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone,
      hour12: false,
    }).format(new Date())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Intl.DateTimeFormat(locale, {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone,
          hour12: false,
        }).format(new Date())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [locale, timeZone]);

  return <span id="clock">{time}</span>;
}

export default LiveClock;
