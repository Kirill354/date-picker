import { ICellItem } from '../components/DatePicker/CellItem';

export const getCurrentMonthDays = (year: number, month: number, numberOfDays: number) => {
   const dateCells: ICellItem[] = [];

   for (let i = 1; i < numberOfDays + 1; i++) {
      dateCells.push({
         year,
         month,
         day: i,
         type: 'current',
      });
   }

   return dateCells;
};
