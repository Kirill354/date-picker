import React, { FC, ReactNode } from 'react';

interface IDayOfWeek {
   children: string;
}

const DayOfWeek: FC<IDayOfWeek> = ({ children }) => {
   return <span className="picker-date-pannel__day">{children}</span>;
};

export default DayOfWeek;
