export const formatDateToSwedish = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('sv-SE', options); // Exempel: "onsdag 20 december"
  };
  
  export const getDayName = (date: Date): string => {
    return date.toLocaleDateString('sv-SE', { weekday: 'long' }); // Exempel: "onsdag"
  };
  
  export const getMonthName = (date: Date): string => {
    return date.toLocaleDateString('sv-SE', { month: 'long' }); // Exempel: "december"
  };
  