import { getDaysInMonth } from './getDaysInMonth';
import { validRegex } from './validRegex';

export const isValidDate = (value: string) => {
   // console.log(value);

   if (!validRegex.test(value)) {
      return false;
   }

   const [day, month, year] = value.split('-').map((i) => parseInt(i, 10));

   const maxDaysInMonth = getDaysInMonth(year, month - 1);
   if (day > maxDaysInMonth) {
      return false;
   }


   return true;
};
