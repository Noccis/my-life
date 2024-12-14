import React, { useState } from "react";
import { db, auth } from "../configuration";
import { addDoc, collection } from "firebase/firestore";

const AddNote: React.FC = () => {
  const [note, setNote] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (!note.trim()) {
      setMessage("Text cannot be empty.");
      return;
    }

    const user = auth.currentUser;

    if (user) {
      try {
        const userNotesCollection = collection(db, `users/${user.uid}/notes`);
        await addDoc(userNotesCollection, {
          text: note,
          createdAt: new Date().toISOString(),
        });
        setMessage("Note saved successfully!");
        setNote("");
      } catch (error) {
        console.error("Error saving note:", error);
        setMessage("Failed to save note. Please try again.");
      }
    } else {
      setMessage("You must be logged in to save a note.");
    }
  };

  return (
    <div>
      <input
        className="margin-bottom input-form"
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Skriv texten här..."
      />
      <button
        className="input-form margin-left button-color"
        onClick={handleSave}
      >
        Spara
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddNote;
