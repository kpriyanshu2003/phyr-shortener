"use client";

import { useEffect, useState } from "react";

function AnimatedCount({ max }) {
  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(max);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    if (isCounting) {
      const interval = setInterval(() => {
        if (count < maxCount) {
          setCount(count + 1);
        } else {
          setIsCounting(false);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [count, maxCount, isCounting]);

  return <>{count}</>;
}

export default AnimatedCount;
