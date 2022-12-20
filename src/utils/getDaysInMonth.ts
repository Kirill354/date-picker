export const getDaysInMonth = (year: number, month: number) => {
   return 32 - new Date(year, month, 32).getDate();
};
