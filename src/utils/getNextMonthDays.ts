import { ICellItem } from '../components/DatePicker/CellItem';
import { getDaysInMonth } from './getDaysInMonth';
import { getPreviousMonthDays } from './getPreviousMonthDays';

export const getNextMonthDays = (year: number, month: number) => {
   const dateCells: ICellItem[] = [];

   const numberOfPreviousMonthDays = getPreviousMonthDays(year, month).length;
   const numberOfCurrentMonthDays = getDaysInMonth(year, month);
   const neededLength = 42 - (numberOfPreviousMonthDays + numberOfCurrentMonthDays);

   const [cellYear, cellMonth] = month === 11 ? [year + 1, 0] : [year, month + 1];

   for (let i = 1; i <= neededLength; i++) {
      dateCells.push({
         year: cellYear,
         month: cellMonth,
         day: i,
         type: 'next',
      });
   }
   return dateCells;
};
