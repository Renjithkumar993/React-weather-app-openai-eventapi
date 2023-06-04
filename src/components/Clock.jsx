import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export default function ClockDiv({isOn}) {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);



  return (
    <div>
      <p>Current time:</p>
      <div className="clock-container">
        <Clock
          value={value}
          renderNumbers={true}
          hourHandLength={50}
          hourHandWidth={8}
          minuteHandLength={70}
          minuteHandWidth={6}
          secondHandLength={90}
          secondHandWidth={4}
          className={` clock ${isOn ? "dark-mode" : "light-mode"}`}
          
        />
        <div className="day-label">{value.toLocaleDateString(undefined, { weekday: 'long' })}</div>
      </div>
    </div>
  );
}
