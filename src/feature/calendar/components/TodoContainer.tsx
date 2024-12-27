import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../configuration';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import AddTodo from './AddTodo';
import { getDayName, getMonthName, getDate } from "../../../utils/dateFormatter"
import { useSelectedDay } from "../context/selectedDayContext";
import "../../../styling/todoContainer.css"

interface Todo {
    id: string;
    text: string;
    createdAt: string;
}

const TodoContainer: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const { selectedDay } = useSelectedDay();
    const dateId = selectedDay.toISOString().split("T")[0]; // YYYY-MM-DD

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

  return (
    <div
    id='todo-container' 
    className='white-card max-width-700'>
        <h3>{getDayName(selectedDay)}</h3>
        <p className='margin-t-b'>{getDate(selectedDay)} {getMonthName(selectedDay)}</p>
        <AddTodo />
        <ul className="notes-list margin-top">
        {todos.map((todo) => (
            <li key={todo.id} className="note-item">
                <span className="note-text">{todo.text}</span>
                <button
            className="delete-btn"
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete Todo"
          >
            🗑️
          </button>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default TodoContainer