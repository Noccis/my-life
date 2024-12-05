import React, { useEffect, useState } from 'react';
import { db, auth } from '../configuration';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

interface Note {
  id: string;
  text: string;
  createdAt: string;
}

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const notesCollection = collection(db, `users/${user.uid}/notes`);
      const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Note[];
        setNotes(notesData);
      });

      return () => unsubscribe(); // Rensa lyssnaren vid avmontering
    }
  }, []);

  const deleteNote = async (id: string) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const noteDoc = doc(db, `users/${user.uid}/notes`, id);
        await deleteDoc(noteDoc);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li key={note.id} className="note-item">
          <span className="note-text">{note.text}</span>
          <button
            className="delete-btn"
            onClick={() => deleteNote(note.id)}
            aria-label="Delete Note"
          >
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
