'use client'
import Image from "next/image"
// Hero banner image
import heroImg from '../public/images/hero_banner_img.png'
// Animate on scroll
import { motion } from "framer-motion"

export default function Header() {
  const motionVariant =  {
    hide: {
        opacity: 0,
    },
    show: {
        opacity: 1,
        transition: {
            duration: 1,
        },
    },
};

  return (
    <motion.header
      initial="hide"
      whileInView="show"
      exit="hide"
      variants={motionVariant}
    >

        <div className="max-w-6xl m-auto flex flex-wrap">
          <div className="w-10/12 m-auto md:w-6/12">
            <Image
              src={heroImg}
              alt='beats headphones'
              height={500}
            />
          </div>

          <div className="mt-3 md:mt-0 w-full md:w-6/12 text-center md:text-left flex flex-col justify-center items-center md:items-start">
            <p className="uppercase text-lg text-white tracking-widest">
              hear it, feel it
            </p>
            <p className="uppercase text-6xl md:text-8xl text-white font-bold">
              move<br />with the<br />music
            </p>
            <div className="py-5 flex gap-4 items-center text-white font-bold">
              <p className="text-4xl">$ 435</p>
              <span className="border-l border-l-white/70 pl-4 text-3xl opacity-70 line-through">$ 465</span>
            </div>
            
            <button className="btn">
              buy now
            </button>
          </div>
        </div>
  
      </motion.header>
  )
}
