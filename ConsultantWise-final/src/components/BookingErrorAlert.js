import React, { useState, useEffect } from 'react';

function BookingErrorAlert({ booking }) {
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
        <div className="alert alert-success" role="alert">
          Slot Already Booked please!! Please select a different slot
        </div>
      )}
    </div>
  );
}

export default BookingErrorAlert;
