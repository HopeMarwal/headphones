'use client'

import { useState } from "react"
// Image
import Image from "next/image"
import logo from '../public/images/beats-electronics.svg'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {

  }

  return (
    <nav>
      <div className="absolute top-0 flex justify-between items-center w-full p-3 py-4">
        {/* Logo */}
        <div>
          <Image 
            src={logo}
            width={60}
            height={60}
            alt='beats headphones logo'
          />
        </div>

        {/* Menu icons */}
        <div className="flex gap-6 items-center">
          {/* Icon wrapper */}
          <div className="wrapper_icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#FF4948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.0004 19.0004L14.6504 14.6504" stroke="#FF4948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <span className="text-4xl text-white/60 font-light">|</span>

          <div className="wrapper_icon">
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 1L1 5V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V5L16 1H4Z" stroke="#FF4948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 5H19" stroke="#FF4948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 9C14 10.0609 13.5786 11.0783 12.8284 11.8284C12.0783 12.5786 11.0609 13 10 13C8.93913 13 7.92172 12.5786 7.17157 11.8284C6.42143 11.0783 6 10.0609 6 9" stroke="#FF4948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <span className="text-4xl text-white/60 font-light">|</span>

          <div className="wrapper_icon">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#FF4948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="#FF4948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

        </div>

        {/* Menu */}
        <div>
          <button onClick={handleToggleMenu}>
            <svg width="41" height="29" viewBox="0 0 41 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.5007 10.334H10.334" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M39.5 2H2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M39.5 18.666H2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M39.5007 27H10.334" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          

        </div>
      </div>

      

    </nav>
  )
}
