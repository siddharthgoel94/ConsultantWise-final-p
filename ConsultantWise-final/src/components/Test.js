import React from 'react'
import { useEffect, useState } from "react";

const Test = () => {

    const [data,setData]=useState([]);
useEffect(()=>{
  const fetchData= async ()=>{
    try{
      console.log('Fetching data...');
            const response = await fetch('http://localhost:3001/getTestData');
            if (!response.ok) {
              throw new Error(`Fetch failed with status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched data:', data);
            setData(data);
    }
    catch(error){
      console.error('Error fetching data:', error);

    }

  }
  fetchData();

},[]);

  return (
    <div>
        {console.log(data)}
        <ul>
        {data.map((item) => (
          <li key={item.name}>{item.name}</li> // Adjust to your data structure
        ))}
        </ul>
      <h1>Hello</h1>
    </div>
  )
}

export default Test
