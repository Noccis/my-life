import React from "react";
import "../../../styling/weekOverview.css";
import { getDayName } from "../../../utils/dateFormatter";
import { useSelectedDay } from "../context/selectedDayContext";

const WeekOverview: React.FC = () => {
  const { setSelectedDay } = useSelectedDay();

  const generateWeekDates = (): Date[] => {
    const today = new Date();
    const weekDates: Date[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      weekDates.push(date);
    }

    return weekDates;
  };

  const weekDates = generateWeekDates();

  return (
    <div
      id="week-overview"
      className="flex-row flex-align-center flex-justify-center"
    >
      {weekDates.map((date, index) => (
        <div
          className="weekday-item flex-column flex-align-center flex-justify-center"
          key={index}
          onClick={() => setSelectedDay(date)}
        >
          {getDayName(date)}
        </div>
      ))}
    </div>
  );
};

export default WeekOverview;

