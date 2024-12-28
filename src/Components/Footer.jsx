import React from 'react'
import logo from "../assets/logo.png"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-8">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        
        <div>

          <div className='flex items-center gap-2 mb-4'>
          <img className='h-10' src={logo} alt="" />
          <h3 className="text-xl font-bold">Study Buddy</h3>
          </div>
        
          <p className="text-gray-400">
            Empowering collaborative learning with tools to create, evaluate, and excel together.
          </p>
        </div>

        
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#about" className="hover:text-blue-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-blue-400">
                Features
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li>Email: support@studybuddy.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Study Lane, Learn City</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Study Buddy. All rights reserved.
      </div>
    </div>
  </footer>
  )
}
