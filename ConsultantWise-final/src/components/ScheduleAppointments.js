import React,{useContext,useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { Logincontext } from './ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import BookingReceivedAlert from './BookingReceivedAlert';
import BookingErrorAlert from './BookingReceivedAlert';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import Select from 'react-select';
import Cookies from "js-cookie";
import AvailableSlots from './AvailableSlots'


import './Home.css'
import './Finddoctor.css'

import './TimePicker.css'
import './DatePicker.css';
import './ScheduleAppointments.css';

const timeOptions = [
  { value: '09:00:00', label: '09:00 AM' },
  { value: '09:15:00', label: '09:15 AM' },
  { value: '09:30:00', label: '09:30 AM' },
  { value: '09:45:00', label: '09:45 AM' },
  { value: '10:00:00', label: '10:00 AM' },
  { value: '10:15:00', label: '10:15 AM' },
  { value: '10:30:00', label: '10:30 AM' },
  { value: '10:45:00', label: '10:45 AM' },
  { value: '11:00:00', label: '11:00 AM' },
  { value: '11:15:00', label: '11:15 AM' },
  { value: '11:30:00', label: '11:30 AM' },
  { value: '11:45:00', label: '11:45 AM' },
  { value: '12:00:00', label: '12:00 PM' },
  
];


const ScheduleAppointments = () => {
    const navigate=useNavigate();
    const [showModal, setShowModal]=useState(false)
    const { account, setAccount ,userType,setUserType} = useContext(Logincontext);

//    const formatMyDate=(date)=>{
//     console.log("Helooooooo"  , date);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
//     const day = String(date.getDate()).padStart(2, "0");
//     console.log("mccccc",`${year}-${month}-${day}`);
//     return (`${year}-${month}-${day}`)
//     // return new Date();
    
//    }
   
 const [selectedDate, setSelectedDate] = useState(new Date());
//  const [formatDate, setFormattedDate] = useState("");


 const [sendDate, setSendDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
  const [selectedEndTime, setSelectedEndTime] = useState(timeOptions[1]);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReceived, setBookingReceived] = useState(false);
  const [bookingError, setBookingError] = useState(false);
  const [userData, setUserData] = useState({
    username:"",
    startTime:"",
    endTime:""

  })
  const [timeSlotData,setTimeSlotData]=useState([]);


//   const year = selectedDate.getFullYear();
//    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
//    const day = String(selectedDate.getDate()).padStart(2, "0");
//    const nayiDate=`${year}-${month}-${day}`;



//   const dateToSearch=selectedDate;
//   console.log(dateToSearch);
//     
    const id=Cookies.get('userLoginData');
   
   
        const fetchData=async(dateToSearch)=>{
    try {
        console.log(dateToSearch);
        const res = await fetch(`http://localhost:3001/getSlots/${dateToSearch}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            // body: JSON.stringify({
            //     id,dateToSearch
            // })
        }).then(response=>{
            return response.json();
        })
        .then((data)=>{
            // const data = await res.json();
            setTimeSlotData(data);
            console.log(data);
        })
        .catch((err)=>{
            console.log("Error occured in get promise ",err)
        });
  
  
        
  
        // if (res.status === 400 || !res) {
        //     console.log("invalid details");
        //     toast.error("Invalid Details 👎!", {
        //         position: "top-center"
        //     });
        // } else {
        //     setTimeSlotData(res.json);
        //     console.log(timeSlotData);
            
       
           
        // }
    } catch (error) {
        console.log("Login Error" + error.message);
    }
};
// fetchData();



  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleSendDateChange(date);
    fetchData(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setSelectedEndTime(null);
  };
  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };
  const handleSendDateChange = (selectedDate) => {
const year = selectedDate.getFullYear();
const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
const day = String(selectedDate.getDate()).padStart(2, "0");

// Format the date as 'YYYY-MM-DD'
const formattedDate = `${year}-${month}-${day}`;
    setSendDate(formattedDate);
  };

  const handleBooking = async () => {
    // Here, you can implement booking logic (e.g., send data to the server)
    
    
 

    // const { D_id,startTime,endTime } = userData;
    const cookieValue = Cookies.get('userLoginData');
    console.log(cookieValue);
   


    // console.log(selectedDate);
    // console.log(selectedTime)
const year = selectedDate.getFullYear();
const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
const day = String(selectedDate.getDate()).padStart(2, "0");

// Format the date as 'YYYY-MM-DD'
const formattedDate = `${year}-${month}-${day}`

const date_appointment=formattedDate;
    const startTime = selectedTime.value;
    const endTime = selectedEndTime.value;
    const id=cookieValue;


    try {
      const res = await fetch("http://localhost:3001/addSlot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,date_appointment,startTime,endTime
        })
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        toast.error("Invalid Details , Try Again", {
          position: "top-center"
        });
      } else {
        setUserData({
          ...userData,
          D_id:"",
          date_appointment:"",
          startTime:"",
          endTime:""

        });
        // toast.success("Slot added Successfully", {
        //   position: "top-center"
        // });
        setBookingReceived(true);
        // setBookingError(false);

    // Simulate resetting bookingReceived after a few seconds (for demo purposes)
    setTimeout(() => {
      setBookingReceived(false);
    }, 10000);
        // navigate("/login")
      }
    } catch (error) {
        setBookingConfirmed(false);
        setBookingError(true);
        setTimeout(() => {
            setBookingError(false);
          }, 10000);

      console.log("front end error" + error.message);
    }
  
    setBookingConfirmed(true);
  };

  
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#212529" : "#000",
      backgroundImage: state.isSelected ? "" : "linear-gradient(to left, #553c9a, #b393d3)",
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      // backgroundColor: "#b393d3",
      backgroundImage:"linear-gradient(to left, #553c9a, #b393d3)",
      padding: "10px",
      border: "none",
      boxShadow: "none",
      fontWeight:"bolder"
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#000" }),
  };

  return (
    <>
    {account && userType?(
    <div>
      <div class="py-20 h-1/2 px-2 space-y-10 bg-gray-900 text-white">
        <h1 className="text-2xl text-center doctor-title">Schedule your appointment slots here</h1>
        

       


        <>
        <div>
      <span className='dateSelectHeading'>Select a Date</span>
      <div className="dateHolder">

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
      />
      </div>
    </div>
    <div>
      <span className='timeSelectHeading'>Select a start Time</span>
      <div className="timeHolder">
      <Select className='timePickerSelectList'
        options={timeOptions}
        value={selectedTime}
        styles={customStyles}
        onChange={handleTimeChange}
      />
      </div>
    </div>
    <div>
    


      <span className='timeSelectHeading'>Select an End Time</span>
      <Select className='timePickerSelectList'
        options={timeOptions.filter((time)=>time.value > selectedTime.value)}
        value={selectedEndTime}
        styles={customStyles}
        onChange={handleEndTimeChange}
      />
    </div>
          {selectedDate && selectedTime && (
            <div>


            <button className="addSlotButton" onClick={handleBooking}>Add slot</button>
            <BookingReceivedAlert booking={bookingReceived} />
            <BookingErrorAlert booking={bookingError} />


            </div>
          )}

<div>
      {/* <h2>Time Slots</h2> */}
      {/* <ul>
      
        <h1 className="bookedSlotsHeading">Your Booked slots for selected date will be displayed here:- </h1>
        {timeSlotData.length>0?(timeSlotData.map((slot, index) => (
          <li key={index}>
            <strong>Start Time:</strong> {slot.startTime}, <strong>End Time:</strong> {slot.endTime}
          </li>
        ))):(<h1 className="noAppointmentBooked">No appointments for selected date</h1>)}
      </ul> */}
      <h1 className="bookedSlotsHeading">Your Booked slots for selected date will be displayed here:- </h1>
      {timeSlotData.length>0?(<table className="styled-table">
        <tr>
          <th>Start Time</th>
          <th>End Time Time</th>
        </tr>
      
        <tbody>
        {timeSlotData.map((slot, index) => (
          <tr>
            <td>{slot.startTime}</td>
           <td> {slot.endTime} </td>
            </tr>
         
        ))}
        </tbody>
      </table>
        )
      :(<h1 className="noAppointmentBooked">No Slots Scheduled for selected date</h1>)}
    </div>
        </>
      

      </div>
      
      </div>
    ):( 
   
        <>
          <div
            className="  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-black ">
                    Login Please
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black font-extralight opacity-40 float-right text-3xl leading-none  outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <NavLink to="/loginDoctor"><p className='text-black'>x</p></NavLink>
                  </button>
                </div>
                
                <div className="relative p-6 flex flex-row space-x-4">
                
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    You must Logged in as a consultant in order to use this service
                  </p>
                </div>
               
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-slate-900 text-slate-300 rounded-xl hover:text-slate-900 hover:bg-slate-300 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={ () => setShowModal(false)}
                  >
                    <NavLink to="/loginDoctor">Login</NavLink>
                    
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) }
    </>
  )
}

export default ScheduleAppointments
