import React, { useState } from "react";
import "../CSS/Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const generateDays = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const startDay = startOfMonth.getDay(); // Day of the week (0 for Sunday, 1 for Monday)
    const totalDays = endOfMonth.getDate();
    const daysArray = [];

    // Add empty spaces for days before the start of the month
    for (let i = 1; i < (startDay === 0 ? 7 : startDay); i++) {
      daysArray.push(null);
    }

    // Add actual days of the month
    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(day);
    }

    return daysArray;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysArray = generateDays();

  return (
    <div>
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-header">
            {day}
          </div>
        ))}
        {daysArray.map((day, index) => (
          <div
            key={index}
            className={`day-cell ${day ? "" : "empty"} ${
              day === currentDate.getDate() && currentDate.getMonth() === new Date().getMonth()
                ? "selected"
                : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
