import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        return { hours: '00', minutes: '00', seconds: '00' };
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      return {
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 uppercase font-bold tracking-wider hidden xs:inline">Ending in:</span>
      <div className="flex items-center gap-1.5">
        <div className="bg-daraz-orange text-white text-sm font-bold px-2 py-1 rounded shadow-sm min-w-[32px] text-center">
          {timeLeft.hours}
        </div>
        <span className="text-daraz-orange font-bold">:</span>
        <div className="bg-daraz-orange text-white text-sm font-bold px-2 py-1 rounded shadow-sm min-w-[32px] text-center">
          {timeLeft.minutes}
        </div>
        <span className="text-daraz-orange font-bold">:</span>
        <div className="bg-daraz-orange text-white text-sm font-bold px-2 py-1 rounded shadow-sm min-w-[32px] text-center">
          {timeLeft.seconds}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;