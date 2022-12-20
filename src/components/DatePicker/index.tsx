import React, { FC, useState, useEffect, useRef } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import Cleave from 'cleave.js/react';

import { useFirstRender } from '../../hooks/useFirstRender';
import { isValidDate } from '../../utils/isValidDate';
import { toNormalDate } from '../../utils/toNormalDate';

import DatePickerPopup from './DatePickerPopup';

type PopupClick = MouseEvent & {
   path: Node[];
};

interface IDatePicker {
   min?: number;
   max?: number;
}

// текущая дата
const currentDate = new Date();

const DatePicker: FC<IDatePicker> = ({ min, max }) => {
   const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
   const [inputValue, setInputValue] = useState<string>('');
   const [openPopup, setOpenPopup] = useState(false);

   const inputWrapperRef = useRef<HTMLDivElement>(null);
   const panelDateRef = useRef<HTMLDivElement>(null);

   const isFirstRender = useFirstRender();

   // outside click
   useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
         const _e = e as PopupClick;
         if (
            inputWrapperRef.current &&
            panelDateRef.current &&
            !_e.path.includes(inputWrapperRef.current) &&
            !_e.path.includes(panelDateRef.current)
         ) {
            // updateInputValue();
            setOpenPopup(false);
         }
      };
      document.body.addEventListener('click', handleOutsideClick);
      return () => {
         document.body.removeEventListener('click', handleOutsideClick);
      };
   }, []);

   // first render
   useEffect(() => {
      if (isFirstRender) {
         setInputValue('');
      } else {
         setInputValue(toNormalDate(selectedDate));
      }
   }, [selectedDate]);

   const handleDateClick = (value: Date) => {
      setSelectedDate(value);
      setOpenPopup(false);
   };

   const updateInputValue = (value = '') => {
      const updateClose = () => {
         inputWrapperRef.current?.blur();
         setOpenPopup(false);
      };

      const updatedValue = (value: string) => {
         const [day, month, year] = value.split('-').map((i) => parseInt(i, 10));

         if (min) {
            if (year < min) {
               console.log('введена дата меньшая MIN');
               setSelectedDate(new Date(min, month - 1, day));
               // убрать дубл код
               updateClose();
               return;
            }
         }
         if (max) {
            if (year > max) {
               console.log('введена дата большая MAX');
               setSelectedDate(new Date(max, month - 1, day));
               // убрать дубл код
               updateClose();
               return;
            }
         }

         // убрать дубл код
         setSelectedDate(new Date(year, month - 1, day));
         updateClose();
      };

      if (value) {
         updatedValue(value);
      } else {
         if (!isValidDate(inputValue)) {
            setInputValue(toNormalDate(selectedDate));
            updateClose();
            return;
         }

         updatedValue(inputValue);
      }
   };

   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();
      setInputValue(value);

      if (isValidDate(value)) {
         updateInputValue(value);
      }
   };

   const onKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') {
         return;
      }

      updateInputValue();
   };

   return (
      <div className="picker-date">
         <div ref={inputWrapperRef} className="picker-date-wrapper">
            <Cleave
               className="picker-date-input"
               value={inputValue}
               onClick={() => setOpenPopup(!openPopup)}
               onKeyDown={onKeyDownInput}
               placeholder="Enter date"
               options={{ date: true, delimiter: '-', datePattern: ['d', 'm', 'Y'] }}
               onChange={onChangeInput}
            />
            <AiOutlineCalendar size={22} className="picker-date-input__icon" />
         </div>
         <div ref={panelDateRef} className="picker-date-pannel-container">
            {openPopup && (
               <DatePickerPopup
                  selectedDate={selectedDate}
                  onChange={handleDateClick}
                  currentDate={currentDate}
               />
            )}
         </div>
      </div>
   );
};

export default DatePicker;
