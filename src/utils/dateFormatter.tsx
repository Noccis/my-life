export const formatDateToSwedish = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('sv-SE', options); // Exempel: "onsdag 20 december"
  };
  
  export const getDayName = (date: Date): string => {
    const dayName = date.toLocaleDateString('sv-SE', { weekday: 'long' }); // Exempel: "onsdag"
    return dayName.charAt(0).toUpperCase() + dayName.slice(1); // Gör första bokstaven stor
  };
  
  
  export const getMonthName = (date: Date): string => {
    const dateName = date.toLocaleDateString('sv-SE', { month: 'long' }); // Exempel: "december"
    return dateName.charAt(0).toLocaleUpperCase() + dateName.slice(1);
  };
  