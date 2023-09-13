import React from 'react'
import './Home.css'

function Home() {
  return (
    <div className='bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
      <div className="flex flex-col  b  ">
        <h1 className='text-center py-8  text-5xl font-semibold main-line'>Feel Better About Finding consultants around you </h1>
        <div className="images py-5 mx-auto justify-center flex flex-col md:flex-row md:space-x-24 space-y-8 md:space-y-0">
        <img className='md:w-1/3 mx-auto md:mx-0  w-4/5 rounded-3xl border-white border-double border-4' src='/doc.jpg'/>
        <img className='md:w-1/3  mx-auto md:mx-0  w-4/5 rounded-3xl border-white border-double border-4' src='/hospital.jpg'/>
        </div>
      </div>
      
      <div className="hospital flex flex-col mx-auto justify-center space-y-5 md:space-y-0">
        <h1 className='text-4xl font-bold text-center py-8 underline subs'>Find Top Experts near You</h1>
        <div className="pics flex flex-col md:flex-row mx-10 md:space-x-10 space-y-8 md:space-y-0">
          <div className=" md:w-1/2 info flex flex-col space-y-8 sum">
          <p className='text-2xl py-8 font-semibold text-center '>ConsultantWise assists you in finding expert that prioritize and excel in client well being.</p>
          <p className='text-xl text-center font-serif'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis provident dicta. Doloribus labore totam eveniet, nam iure quam distinctio reiciendis cumque fuga repellat dolorum pariatur. Commodi quas fugiat nisi?
Eveniet provident rem et temporibus consequuntur mollitia dicta nisi optio recusandae? Quibusdam esse odit totam dignissimos, neque, alias voluptas laudantium nulla a omnis unde veritatis asperiores necessitatibus labore quod eaque!

          </p>
          </div>
            

            <img className='md:w-1/2 rounded-full border-double border-4' src="/hosp.jpg" alt="" />
        </div>
      </div>
      <div className="doctor flex flex-col py-8 mx-auto justify-center space-y-5 md:space-y-0">
        <h1 className='text-4xl font-bold text-center py-8 underline subs'>Find the Best Experts for You</h1>
        <div className="pics flex flex-col md:flex-row mx-10 md:space-x-10">
         <img className='md:w-1/2 rounded-full border-double border-4' src="/find_doc.jpg" alt="" />
          <div className=" md:w-1/2 info flex flex-col space-y-8 sum">
          <p className='text-2xl py-8 font-semibold text-center '>Finding the Right Help Matters</p>
          <p className='text-xl text-center font-serif'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nobis provident dicta. Doloribus labore totam eveniet, nam iure quam distinctio reiciendis cumque fuga repellat dolorum pariatur. Commodi quas fugiat nisi?</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home