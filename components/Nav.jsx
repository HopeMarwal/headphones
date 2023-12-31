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
//Icons
import { RiShoppingBag3Line } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi'
import { VscListFlat } from 'react-icons/vsc';
import { BsPerson, BsSun, BsMoonFill } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai'
//Theme toggle
import { useTheme } from "next-themes"



export default function Nav() {
  // Auth
  const { data: session } = useSession()
  // State
  const [providers, setProviders] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //Theme
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  const currentTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    const setupProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setMounted(true)
    setupProviders()
  }, [])

  const toggleIconTheme = () => {
    if(!mounted) return null
    if(currentTheme === 'dark') {
      return <BsSun />
    } else {
      return <BsMoonFill />
    }
  }

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
  
  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const toggleTheme = () => {
    if(currentTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <nav>
      <div className="absolute top-0 flex justify-between items-center w-full p-3 py-4">
        {/* Logo */}
        <Link href='/'>
          <Image
            className="image"
            src={logo}
            alt='beats headphones logo'
          />
        </Link>

        {/* Menu icons */}
        <div className="flex gap-3 md:gap-6 items-center">
          {/* Icon wrapper */}
          <div className="wrapper_icon">
            <FiSearch />
          </div>

          <span className="text-4xl text-white/60 font-light">|</span>

          <Link href='/cart' className="wrapper_icon">
            <RiShoppingBag3Line />
          </Link>

          <span className="text-4xl text-white/60 font-light">|</span>

          <div className="wrapper_icon">
            { session?.user 
              ? (<button onClick={signOut}><AiOutlineLogout /></button>)
              : providers && 
                Object.values(providers).map((prov) => (
                  <button key={prov.id} onClick={() => signIn(prov.id)}><BsPerson /></button>
                ))
            }
          </div>

        </div>

        {/* Menu */}
        <div className="flex items-center">
          <button onClick={handleToggleMenu} className="text-white text-2xl w-14">
            <VscListFlat />
          </button>
          <button onClick={toggleTheme} className="rounded-full bg-white text-primary-red w-8 h-8 flex items-center justify-center">
            {toggleIconTheme()}
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
