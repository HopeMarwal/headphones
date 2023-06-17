'use client'

import { useState, useEffect} from "react"
// Image
import Image from "next/image"
import logo from '../public/images/beats-electronics.svg'
// Router
import Link from "next/link"
import {  usePathname } from "next/navigation"
// Session
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

export default function Nav() {
  // Auth
  const { data: session } = useSession()
  // State
  const [providers, setProviders] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const setupProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setupProviders()
  }, [])

  // Next navigation
  const pathname = usePathname()
  
  const menuLinks = [
    { title: 'Home', path: '/'},
    { title: 'About', path: '/about'},
    { title: 'Product', path: '/products'},
  ]

  const listItems = menuLinks.map((item) => (
    <li 
      key={item.title}
      className={pathname == item.path ? 'active' : ''}
      onClick={() => setIsMenuOpen(false)}
    >
      <Link href={item.path}>{item.title}</Link>
    </li>
  ))

  const login = <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 19V17C17 15.9391 16.5786 14.9217 15.8284 14.1716C15.0783 13.4214 14.0609 13 13 13H5C3.93913 13 2.92172 13.4214 2.17157 14.1716C1.42143 14.9217 1 15.9391 1 17V19" stroke="#FF4948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z" stroke="#FF4948" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

  const logout = <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.4993 20.0837C5.20647 20.0837 0.916016 15.7932 0.916016 10.5003C0.916016 5.20745 5.20647 0.916995 10.4993 0.916995C11.9873 0.915877 13.455 1.26178 14.7859 1.92721C16.1168 2.59265 17.2741 3.55929 18.166 4.75033H15.5689C14.4623 3.77451 13.0976 3.13875 11.6385 2.91934C10.1795 2.69992 8.68816 2.90616 7.34345 3.51332C5.99874 4.12048 4.85778 5.10277 4.0575 6.3423C3.25722 7.58183 2.8316 9.02596 2.83172 10.5014C2.83184 11.9768 3.2577 13.4209 4.05819 14.6603C4.85868 15.8997 5.9998 16.8818 7.34461 17.4887C8.68943 18.0956 10.1808 18.3016 11.6398 18.082C13.0988 17.8623 14.4634 17.2263 15.5699 16.2503H18.167C17.275 17.4415 16.1175 18.4082 14.7864 19.0737C13.4554 19.7391 11.9875 20.0849 10.4993 20.0837ZM17.2077 14.3337V11.4587H9.54101V9.54199H17.2077V6.66699L21.9993 10.5003L17.2077 14.3337Z" fill="#FF4948"/>
                </svg>
  
  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <nav>
      <div className="absolute top-0 flex justify-between items-center w-full p-3 py-4">
        {/* Logo */}
        <div>
          <Image
            className="image"
            src={logo}
            alt='beats headphones logo'
          />
        </div>

        {/* Menu icons */}
        <div className="flex gap-3 md:gap-6 items-center">
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
            { session?.user 
              ? (<button onClick={signOut}>{logout}</button>)
              : providers && 
                Object.values(providers).map((prov) => (
                  <button key={prov.id} onClick={() => signIn(prov.id)}>{login}</button>
                ))
            }
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
        {isMenuOpen && 
          <ul className="absolute top-20 right-0 p-3 px-5 bg-secondary-gray/30 rounded-es-lg backdrop-blur-md ">
            {listItems}
          </ul>
        }
      </div>
    </nav>
  )
}
