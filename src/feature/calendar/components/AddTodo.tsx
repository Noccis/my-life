import React, { useState } from "react";
import { db, auth } from "../../../configuration";
import { addDoc, collection } from "firebase/firestore";
import { format } from "date-fns";

const AddTodo: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
 
  const currentDate = format(new Date(), "EEEE/MM/dd/yyyy");

  const handleSave = async () => {
    if (todo.length === 0) {
      console.log("Input is empty");
      return;
    }

    const user = auth.currentUser;

    if (user) {
      try {
        const userTodosCollection = collection(db, `users/${user.uid}/todos`);
        await addDoc(userTodosCollection, {
          text: todo,
          createdAt: currentDate,
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
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Lägg till att göra"
      />
      <button
        onClick={handleSave}
      >
        Spara
      </button>
    </div>
  );
};

export default AddTodo;
