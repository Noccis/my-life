import React, { useState } from "react";
import { db, auth } from "../../../configuration";
import { addDoc, collection } from "firebase/firestore";
import { useSelectedDay } from "../context/selectedDayContext";

const AddTodo: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const { selectedDay } = useSelectedDay();
  const dateId = selectedDay.toISOString().split("T")[0]; // YYYY-MM-DD

  const handleSave = async () => {
    if (todo.length === 0) {
      console.log("Input is empty");
      return;
    }

    const user = auth.currentUser;

    if (user) {
      try {
        const userTodosCollection = collection(
          db,
          `users/${user.uid}/calendarDays/${dateId}/todos`
        );
        await addDoc(userTodosCollection, {
          text: todo,
          createdAt: selectedDay,
        });
        console.log("Todo saved!");
        setTodo("");
      } catch (error) {
        console.error("Error saving note:", error);
      }
    } else {
      console.log("You must be logged in to save a note.");
    }
  };

  return (
    <div className="margin-t-b-large">
      <input
        className="input-form"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Lägg till att göra"
      />
      <button
        className="input-form margin-left button-color"
        onClick={handleSave}
      >
        Spara
      </button>
    </div>
  );
};

export default AddTodo;
