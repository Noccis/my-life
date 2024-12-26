import React, { createContext, useContext, useState, ReactNode } from "react";

// Typ för kontextens värde
interface SelectedDayContextValue {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}

// Skapa kontexten
const SelectedDayContext = createContext<SelectedDayContextValue | undefined>(
  undefined
);

// Provider-komponent
export const SelectedDayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Sätt dagens datum som startvärde
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  return (
    <SelectedDayContext.Provider value={{ selectedDay, setSelectedDay }}>
      {children}
    </SelectedDayContext.Provider>
  );
};

// Hook för att använda kontexten
export const useSelectedDay = (): SelectedDayContextValue => {
  const context = useContext(SelectedDayContext);
  if (!context) {
    throw new Error("useSelectedDay must be used within a SelectedDayProvider");
  }
  return context;
};