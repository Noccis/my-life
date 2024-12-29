import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../configuration';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AddTodo from './AddTodo';
import { getDayName, getMonthName, getDate } from "../../../utils/dateFormatter"
import { useSelectedDay } from "../context/selectedDayContext";
import "../../../styling/todoContainer.css"

interface Todo {
    id: string;
    text: string;
    createdAt: string;
    isDone: boolean; // Ny boolean för status
}

const TodoContainer: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const { selectedDay } = useSelectedDay();
    const dateId = selectedDay.toISOString().split("T")[0]; // YYYY-MM-DD
    const [deleteMode, setDeleteMode] = useState(false); // För delete-läge

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const todosCollection = collection(db, `users/${user.uid}/calendarDays/${dateId}/todos`);
      const unsubscribe = onSnapshot(todosCollection, (snapshot) => {
        const todosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Todo[];
        setTodos(todosData);
      });

      return () => unsubscribe(); // Rensa lyssnaren vid avmontering
    }
  }, [selectedDay]);

    const deleteTodo = async (id: string) => {
      const user = auth.currentUser;
      if (user) {
        try {
          const todosDoc = doc(db, `users/${user.uid}/calendarDays/${dateId}/todos`, id);
          await deleteDoc(todosDoc);
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      }
    };

    const toggleIsDone = async (id: string, isDone: boolean) => {
      const user = auth.currentUser;
      if (user) {
        try {
          const todosDoc = doc(
            db,
            `users/${user.uid}/calendarDays/${dateId}/todos`,
            id
          );
          await updateDoc(todosDoc, { isDone: !isDone });
        } catch (error) {
          console.error("Error updating todo:", error);
        }
      }
    };

    return (
      <div id="todo-container" className="white-card">
        <h3>{getDayName(selectedDay)}</h3>
        <p className="margin-t-b">
          {getDate(selectedDay)} {getMonthName(selectedDay)}
        </p>
        <AddTodo />
        <button
          className="button-color input-form top-right-corner"
          onClick={() => setDeleteMode(!deleteMode)}
        >
          {deleteMode ? "Avbryt radering" : "Aktivera radering"}
        </button>
        <ul className="notes-list margin-top">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`note-item ${todo.isDone ? "done" : ""}`}
            >
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleIsDone(todo.id, todo.isDone)}
                className="checkbox"
              />
              <span className="note-text">{todo.text}</span>
              {deleteMode && (
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete Todo"
                >
                  🗑️
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default TodoContainer