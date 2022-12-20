import React, { FC } from 'react';
import cn from 'classnames';

export interface ICellItem {
   year: number;
   month: number;
   day: number;
   type: 'current' | 'prev' | 'next';
   selectedDate?: Date;
   currentDate?: Date;
   onDateClick?: (value: ICellItem) => void;
}

const CellItem: FC<ICellItem> = ({
   year,
   month,
   day,
   type,
   currentDate,
   selectedDate,
   onDateClick,
}) => {
   const isCurrent =
      year === currentDate?.getFullYear() &&
      month === currentDate?.getMonth() &&
      day === currentDate?.getDate();
   const isSelected =
      year === selectedDate?.getFullYear() &&
      month === selectedDate?.getMonth() &&
      day === selectedDate?.getDate();
   const dayOfCurrentMonth = type === 'current' ? true : false;

   const handleClick = () => {
      if (onDateClick) {
         onDateClick({
            year,
            month,
            day,
            type,
         });
      }
   };
   return (
      <span
         className={cn(
            {
               'picker-date-pannel__item--cur': isCurrent,
               'picker-date-pannel__item--selected': isSelected,
               'picker-date-pannel__item--notCurMonth': !dayOfCurrentMonth,
            },
            'picker-date-pannel__item',
         )}
         onClick={handleClick}>
         {day}
      </span>
   );
};

export default CellItem;
