import React, { useState, useEffect } from "react";
import { db } from "../configuration";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDoc,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "../styling/weekOverview.css";

interface DayActivities {
  [key: string]: string[];
}

const WeekOverview: React.FC = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<DayActivities>({});

  useEffect(() => {
    if (!user) return;

    const userCollectionRef = collection(db, "users", user.uid, "weekActivities");

    const unsubscribe = onSnapshot(
      userCollectionRef,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const updatedActivities: DayActivities = {};
        snapshot.forEach((doc) => {
          updatedActivities[doc.id] = doc.data().activities || [];
        });

        setActivities(updatedActivities);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addActivity = async (day: string, activity: string) => {
    if (!user) return;

    const dayDocRef = doc(db, "users", user.uid, "weekActivities", day);
    const dayDocSnap = await getDoc(dayDocRef);

    // Om dokumentet inte finns, skapa det med en tom activities-array, annars kan vi inte uppdatera
    if (!dayDocSnap.exists()) {
      await setDoc(dayDocRef, { activities: [] });
    }

    await updateDoc(dayDocRef, {
      activities: arrayUnion(activity),
    });
  };

  const removeActivity = async (day: string, activityIndex: number) => {
    if (!user) return;

    const userId = user.uid;
    const activityToRemove = activities[day][activityIndex];

    // Ta bort aktiviteten från den lokala staten
    setActivities((prevActivities) => ({
      ...prevActivities,
      [day]: prevActivities[day].filter((_, index) => index !== activityIndex),
    }));

    // Uppdatera Firebase Firestore
    const dayDocRef = doc(db, "users", userId, "weekActivities", day);
    const dayDocSnap = await getDoc(dayDocRef);

    // Om dokumentet inte finns, skapa det med en tom activities-array
    if (!dayDocSnap.exists()) {
      await setDoc(dayDocRef, { activities: [] });
    }

    await updateDoc(dayDocRef, {
      activities: arrayRemove(activityToRemove),
    });
  };

  const dayOrder = [
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "Söndag",
  ];

  return (
    <div id="week-overview" className="flex-column">
      {dayOrder.map((day) => (
        <div key={day} className="day">
          <h3 className="margin-t-b">{day}</h3>
          <ul className="day-ul">
            {(activities[day] || []).map((activity, index) => (
              <li key={index}>
                {activity}
                <button
                  className="day-button"
                  onClick={() => removeActivity(day, index)}
                >
                  Ta bort
                </button>
              </li>
            ))}
          </ul>
          <input
            className="input-form margin-top"
            type="text"
            placeholder={`Lägg till aktivitet på ${day}`}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                (e.target as HTMLInputElement).value.trim() !== ""
              ) {
                addActivity(day, (e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = ""; // Rensa inputfältet
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default WeekOverview;
