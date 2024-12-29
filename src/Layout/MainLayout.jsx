import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

export default function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar></Navbar>
        <div className='flex-grow'>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}
