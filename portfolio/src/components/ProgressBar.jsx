import React, { useState, useEffect } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let randomNum = 10;
    const newNum = () => {
      randomNum = Math.floor(Math.random() * 20);
    };

    const interval = setInterval(() => {
      newNum();

      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);

          return 100;
        }
        return prevProgress + randomNum;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <progress value={progress} max="100" />
      <span>{progress}%</span>
    </div>
  );
}

export default ProgressBar;
