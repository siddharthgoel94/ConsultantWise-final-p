import Cookies from 'js-cookie';
import React, { useEffect } from 'react'
import { useState } from 'react';
// receiving the {doctor_id} inside props from doctor card
const ShowAvailableSlots = (props) => {
  const id=props.id;
  const [data,setData]=useState([]);
  const [postData, setPostData] = useState({}); // State to hold the POST data
  const [response, setResponse] = useState(null)
  const [booked, setBooked] = useState(false)
  // const fetchData2 = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/getDoctorFreeSlotDetails/${id}/${props.date}`);
  //     const json = await response.json();
  //     setData(json)
  //     // console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getDoctorFreeSlotDetails/${id}/${props.date}`);
        const json = await response.json();
        setData(json)
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();


  },[booked])


  const handleBookSlot=(app_id)=>{
    // alert(`A slot was booked with id=$(id)`)
    console.log("slot was booked with id ",app_id);
    const user_id=Cookies.get('userLoginData');
    setPostData({
      ...postData,
      user_id:user_id,
      app_id:app_id
    })
    console.log(postData);
    fetch('http://localhost:3001/bookASlot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(postData), // Convert the data to JSON format
    })
      .then((response) => response.json()) // Parse the response JSON
      .then((data) => {
        // Handle the response data
        
        setResponse(data);
        // fetchData2();
        setBooked(!booked);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
    

  }
  
  return (
    <div>
      
      <ul>
        
        {data.length>0 && (data.map((item) => (
          <li key={item.id}> {item.startTime} -- {item.endTime} 
          <button onClick={()=>{
            handleBookSlot(item.id);
          }}
      className="bg-yellow-400 mt-4 ml-16 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded"
    >
      Book Slot
    </button>
          
          </li>
        )))}
      </ul>


    </div>
  )
}

export default ShowAvailableSlots
