import React, { useState, useEffect } from 'react';
import './BookingReceivedAlert.css';

function BookingReceivedAlert({ booking }) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    // Trigger the alert when a booking is received
    if (booking) {
      setShowAlert(true);

      // Automatically hide the alert after a few seconds (e.g., 5 seconds)
      const timeoutId = setTimeout(() => {
        setShowAlert(false);
      }, 5000);

      // Clean up the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [booking]);

  return (
    <div>
      {showAlert && (
        <div className="alert alert-success bookingAlert" role="alert">
          Slot Booked Successfully
        </div>
      )}
    </div>
  );
}

export default BookingReceivedAlert;
