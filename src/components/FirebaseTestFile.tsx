import React, { useEffect, useState } from 'react';
import { db } from '../configuration';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const FirebaseTestFile: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const testFirestore = async () => {
      const testDocRef = doc(db, 'test', 'message');

      try {
        // Skriv data till Firestore
        await setDoc(testDocRef, { message: 'Hello from Firebase!' });
        console.log('Data written successfully');

        // Läs data från Firestore
        const docSnap = await getDoc(testDocRef);
        if (docSnap.exists()) {
          setMessage(docSnap.data()?.message);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error interacting with Firestore:', error);
      }
    };

    testFirestore();
  }, []);

  return <div>Firestore message: {message}</div>;
};

export default FirebaseTestFile;
