import Cookies from 'js-cookie';
import React from 'react'
import { useState , useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AvailableSlots = (props) => {
   
    const dateToSearch=JSON.parse(props.date).sendDate;
    console.log(dateToSearch);
    const id=Cookies.get('userLoginData');
    const [timeSlotData,setTimeSlotData]=useState([]);
    useEffect(() => {
        const fetchData=async()=>{
    try {
        const res = await fetch(`http://localhost:3001/getSlots/${dateToSearch}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
            // body: JSON.stringify({
            //     id,dateToSearch
            // })
        });
  
  
        const data = await res.json();
        console.log(data);
  
        if (res.status === 400 || !data) {
            console.log("invalid details");
            toast.error("Invalid Details 👎!", {
                position: "top-center"
            });
        } else {
            setTimeSlotData(data);
            console.log(timeSlotData);
            
        //   Cookies.set('userLoginData',data.id,{expires:7});
            // toast.success("Login Successfull", {
            //     position: "top-center"
            // });
           
        }
    } catch (error) {
        console.log("Login Error" + error.message);
    }
};
fetchData();
  }, []);
    
  return (
    <div>
      AvailableSlots
      {/* {props.date} */}

      {timeSlotData[0].startTime}---- {timeSlotData[0].endTime}
    
    </div>
  )
}

export default AvailableSlots
