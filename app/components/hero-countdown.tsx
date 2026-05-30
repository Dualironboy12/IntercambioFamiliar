"use client";

import { useEffect, useState } from "react";

export function HeroCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-12-25T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-primary to-primary/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-4 tracking-tight">
            Intercambio Familiar 2026
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-12">
            Sitio oficial del intercambio familiar 2026.
          </p>

          <div className="bg-card/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-primary-foreground/10 shadow-2xl">
            <p className="text-sm sm:text-base text-primary-foreground/70 mb-6 uppercase tracking-wider">
              Quedan
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: "Dias", value: timeLeft.days },
                { label: "Horas", value: timeLeft.hours },
                { label: "Minutos", value: timeLeft.minutes },
                { label: "Segundos", value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-accent mb-2 tabular-nums">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs sm:text-sm text-primary-foreground/60 uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm sm:text-base text-primary-foreground/70 mt-7 uppercase tracking-wider">
              para el intercambio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
