import { useState, useEffect } from "react";
import "./App.css";

/**
 *
 * Clock UI:
 * - Clock
 * - Faces/Marks => 60 -> 12 for hours and 48 for minutes
 * - Hands (hour,minutes and seconds)
 * Functionality
 */

const Mark = ({ angle, type }) => {
  return (
    <div
      className={`clock__face-mark clock__face-mark--${type}`}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div
        style={{
          width: "5px",
          height: type === "hour" ? "30px" : "10px",
          backgroundColor: type === "hour" ? "red" : "black",
        }}
      />
    </div>
  );
};

const Hand = ({ type, angle }) => {
  return (
    <div className="clock__hand" style={{ transform: `rotate(${angle}deg)` }}>
      <div className={`clock__hand-body clock__hand-body--${type}`} />
    </div>
  );
};
export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const renderFaceMarks = () => {
    const marks = [];
    for (let i = 1; i <= 60; i++) {
      marks.push(
        <Mark key={i} angle={i * 6} type={i % 5 === 0 ? "hour" : "minute"} />
      );
    }
    return marks;
  };
  const hours = currentTime.getHours() % 12;
  //console.log(hours);
  const minutes = currentTime.getMinutes();
  //console.log(minutes);
  const seconds = currentTime.getSeconds();
  // console.log(seconds);
  const hourDeg = hours * 30 + 0.5 * minutes + 0.008333333 * seconds; // 30 degrees per hour, 0.5 degrees per minute
  const minuteDeg = minutes * 6 + 0.1 * seconds; // 6 degrees per minute, 0.1 degrees per second
  const secondDeg = seconds * 6;
  return (
    <div className="container">
      <div className="clock">
        <div className="clock__face">{renderFaceMarks()}</div>
        <Hand type="hour" angle={hourDeg} />
        <Hand type="minutes" angle={minuteDeg} />
        <Hand type="seconds" angle={secondDeg} />
      </div>
    </div>
  );
}
