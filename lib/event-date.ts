"use client";

import { useEffect, useState } from "react";

/** Christmas Eve / Intercambio date: 25 December 2026 at midnight local time. */
export const EVENT_DATE = new Date("2026-12-25T00:00:00");

export type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Returns a live countdown to `target` (defaults to EVENT_DATE).
 * Updates every second; stops at zero once the target date is reached.
 */
export function useCountdown(target: Date = EVENT_DATE): CountdownTime {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const compute = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}
