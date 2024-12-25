// src/utils/dateUtils.ts

export const formatDateToSwedish = (date: Date): string => {
    return new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };