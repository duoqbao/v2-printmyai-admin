import React, { useEffect, useState } from "react";
function CountdownTimer({ targetDate }) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Tính thời gian còn lại sau mỗi giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  function calculateTimeRemaining() {
    const difference = new Date(targetDate) - new Date();

    if (difference < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const time = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return time;
  }

  // Hiển thị thời gian còn lại
  return (
    <div className="countdown-date">
      <div className="date">
        <span>{timeRemaining.days}</span>
        <span>Day</span>
      </div>
      <div className="date">
        <span>{timeRemaining.hours}</span>
        <span>Hours</span>
      </div>
      <div className="date">
        <span>{timeRemaining.minutes}</span>
        <span>Minutes</span>
      </div>
      <div className="date">
        <span>{timeRemaining.seconds}</span>
        <span>Seconds</span>
      </div>
    </div>
  );
}

export default CountdownTimer;
