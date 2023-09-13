// DatePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

const DatePickerComponent = ({ selectedDate, handleDateChange }) => {
  return (
    <div>
      <span className='dateSelectHeading'>Select a Date</span>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        minDate={new Date()}
      />
    </div>
  );
};

export default DatePickerComponent;
