import React from 'react'
import { FaChevronCircleDown } from "react-icons/fa";

export default function Hero() {
  return (
    <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Learn Together, Succeed Together!</h1>
      <p className="mb-5 text-xl">
      Your ultimate platform for collaborative learning! Study Buddy is designed to make group study more engaging, productive, and efficient. 
      </p>
      <div className='flex flex-col items-center justify-center mt-20 text-yellow-300'>
      <p className=' '>Scroll down to know more</p>
      <div className='text-3xl mt-4'>
      <FaChevronCircleDown/>
      </div>
      </div>
     

    </div>
  </div>
</div>
  )
}
