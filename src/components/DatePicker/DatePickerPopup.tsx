import { RxArrowLeft, RxArrowRight, RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';

import DayOfWeek from './DayOfWeek';
import CellItem, { ICellItem } from './CellItem';

import { FC, useMemo, useState } from 'react';
import { getCurrentMonthDays } from '../../utils/getCurrentMonthDays';
import { getDaysInMonth } from '../../utils/getDaysInMonth';
import { getNextMonthDays } from '../../utils/getNextMonthDays';
import { getPreviousMonthDays } from '../../utils/getPreviousMonthDays';

interface IDatePicker {
   selectedDate: Date;
   currentDate: Date;
   onChange: (value: Date) => void;
}

export const months = [
   'Jan',
   'Feb',
   'Mar',
   'Apr',
   'May',
   'Jun',
   'Jul',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dec',
];
export const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const DatePickerPopup: FC<IDatePicker> = ({ selectedDate, onChange, currentDate }) => {
   const [panelYear, setPanelYear] = useState(() => selectedDate.getFullYear());
   const [panelMonth, setPanelMonth] = useState(() => selectedDate.getMonth());

   const dateCells = useMemo(() => {
      const dayInMonth = getDaysInMonth(panelYear, panelMonth);

      const prevMonthDays = getPreviousMonthDays(panelYear, panelMonth);
      const currentMonthDays = getCurrentMonthDays(panelYear, panelMonth, dayInMonth);
      const nextMonthDays = getNextMonthDays(panelYear, panelMonth);

      return [...prevMonthDays.reverse(), ...currentMonthDays, ...nextMonthDays];
   }, [panelYear, panelMonth, selectedDate]);

   const onDateClick = ({ year, month, day }: ICellItem) => {
      onChange(new Date(year, month, day));
   };
   const onTodayDateClick = () => {
      onChange(currentDate);
   };

   const prevYear = () => {
      setPanelYear((prev) => prev - 1);
   };
   const prevMonth = () => {
      if (panelMonth === 0) {
         setPanelMonth(11);
         setPanelYear((prev) => prev - 1);
      } else {
         setPanelMonth((prev) => prev - 1);
      }
   };
   const nextMonth = () => {
      if (panelMonth === 11) {
         setPanelMonth(0);
         setPanelYear((prev) => prev + 1);
      } else {
         setPanelMonth((prev) => prev + 1);
      }
   };
   const nextYear = () => {
      setPanelYear((prev) => prev + 1);
   };

   return (
      <div className="picker-date-pannel">
         <div className="picker-date-pannel__header">
            <RxDoubleArrowLeft
               className="picker-date-pannel__header-icon"
               size={24}
               onClick={prevYear}
            />
            <RxArrowLeft
               className="picker-date-pannel__header-icon"
               size={24}
               onClick={prevMonth}
            />
            <span>
               {months[panelMonth]} {panelYear}
            </span>
            <RxArrowRight
               className="picker-date-pannel__header-icon"
               size={24}
               onClick={nextMonth}
            />
            <RxDoubleArrowRight
               className="picker-date-pannel__header-icon"
               size={24}
               onClick={nextYear}
            />
         </div>
         <div className="picker-date-pannel__body">
            {daysOfWeek.map((day) => (
               // <span key={day}>{day}</span>
               <DayOfWeek key={day}>{day}</DayOfWeek>
            ))}
            {dateCells.map((cell) => (
               // <span key={index}>{cell.day}</span>
               <CellItem
                  key={`${cell.year}${cell.month}${cell.day}`}
                  {...cell}
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  onDateClick={(value) => onDateClick(value)}
               />
            ))}
         </div>
         <div className="picker-date-pannel__footer">
            <span onClick={onTodayDateClick}>Today</span>
         </div>
      </div>
   );
};

export default DatePickerPopup;
