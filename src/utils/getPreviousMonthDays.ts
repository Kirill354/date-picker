import { ICellItem } from '../components/DatePicker/CellItem';
import { getDaysInMonth } from './getDaysInMonth';

export const getPreviousMonthDays = (year: number, month: number) => {
   const dateCells: ICellItem[] = [];
   const firstDayInCurrentMonth = new Date(year, month, 1);
   const numberOfPreviousMonthDays = getDaysInMonth(year, month - 1);

   const [cellYear, cellMonth] = month === 0 ? [year - 1, 11] : [year, month - 1];

   for (
      let i = numberOfPreviousMonthDays;
      i > numberOfPreviousMonthDays - firstDayInCurrentMonth.getDay();
      i--
   ) {
      dateCells.push({
         year: cellYear,
         month: cellMonth,
         day: i,
         type: 'prev',
      });
   }

   return dateCells;
};
