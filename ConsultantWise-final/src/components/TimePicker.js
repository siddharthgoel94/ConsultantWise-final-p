// TimePicker.js
import React from 'react';
import Select from 'react-select';
import './TimePicker.css'

const timeOptions = [
  { value: '09:00 AM', label: '09:00 AM' },
  { value: '10:00 AM', label: '10:00 AM' },
  { value: '11:00 AM', label: '11:00 AM' },
  // Add more time options as needed
];

const TimePicker = ({ selectedTime, handleTimeChange }) => {
  return (
    <div>
      <span className='timeSelectHeading'>Select a Time</span>
      <Select className='timePickerSelectList'
        options={timeOptions}
        value={selectedTime}
        onChange={handleTimeChange}
      />
    </div>
  );
};

export default TimePicker;
