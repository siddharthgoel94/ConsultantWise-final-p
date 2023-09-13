// BookingConfirmation.js
import React from 'react';

const BookingConfirmation = ({ selectedDate, selectedTime,handleBooking }) => {
  return (
    <div>
      <h2>Booking Confirmation</h2>
      <p>Date: {selectedDate.toLocaleDateString()}</p>
      <p>Time Slot : {selectedTime}</p>
      <button onClick={handleBooking}>Add slot</button>
    </div>
  );
};

export default BookingConfirmation;
