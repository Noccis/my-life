import { eachDayOfInterval, format } from "date-fns";

const SelectedDay = () => {
  const currentDate = new Date();
  const test = format(currentDate, "EEEE/MM/dd/yyyy");
  console.log(currentDate);

  return (
    <div>
      <h3>Idag: </h3>
      <p>{test}</p>
    </div>
  );
};

export default SelectedDay;

/*
import { eachDayOfInterval, format } from "date-fns";
   const start = new Date(2022, 0, 27);
    const end = new Date(2022, 1, 3);
    const result = eachDayOfInterval({ start, end });
    const formattedDates = result.map((day) => format(day, "EEEE/MM/dd/yyyy")); 

const Calendar = () => {
  const start = new Date(2022, 0, 27);
  const end = new Date(2022, 1, 3);
  const result = eachDayOfInterval({ start, end });
  const formattedDates = result.map((day) => format(day, "EE/MM/dd/yyyy"));


  return (
    <div>
      {formattedDates.map((formattedDay, index) => (
        <p key={index}>{formattedDay}</p>
      ))}
    </div>
  )
};


export default Calendar;



Få alla datum mellan ett visst intervall:
  const start = new Date(2022, 0, 27);
  const end = new Date(2022, 1, 3);
  const res = eachDayOfInterval({ start, end });


  Få ut ex, Thursday, 01,10,2024
 const newDate = format(dateVariableName, "MM/dd/yyyy");




*/
