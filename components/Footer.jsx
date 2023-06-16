// Icons
import logo from '../public/images/beats-electronics.svg'
import inst from '../public/icons/inst.svg'
import fb from '../public/icons/fb.svg'
import tw from '../public/icons/tw.svg'

// Next
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
    <div className="flex flex-wrap justify-evenly sm:justify-between gap-3 sm:gap-0 items-center max-w-6xl mx-auto p-3 py-4">
      {/* Logo */}
      <div>
        <Image
          className="image"
          src={logo}
          alt='beats headphones logo'
        />
        
      </div>

      {/* Menu */}
      <div className="flex gap-3 md:gap-6 items-center text-white order-3 sm:order-2">
        <Link href='/'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/product'>Product</Link>
      </div>

      {/* Social*/}
      <div className='flex gap-4 justify-between order-2 sm:order-3'>
        <div className='rounded-full flex justify-center items-center w-12 h-12 bg-white'>
          <Image src={inst} alt='instagram' />
        </div>
        <div className='rounded-full flex justify-center items-center w-12 h-12 bg-white'>
          <Image src={tw} alt='twitter' />
        </div>
        <div className='rounded-full flex justify-center items-center w-12 h-12 bg-white'>
          <Image src={fb} alt='facebook' />
        </div>
      </div>


    </div>
  </footer>
  )
}
