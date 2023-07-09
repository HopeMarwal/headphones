'use client'
import img from '../public/images/product_main_banner.png'
import Image from 'next/image'
// Data
import { specifications } from '@/utils/data'
// Animate on scroll
import { motion } from "framer-motion"

export default function ProductItemMain() {

  const motionLeftVariant =  {
    hide: {
        opacity: 0,
        x: -200
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
          duration: 1,
      },
    },
  };

  const motionRightVariant =  {
    hide: {
        x: 200,
        opacity: 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
          duration: 1,
          
      },
    },
  };

  return (
    <div className='flex flex-wrap p-3 items-center overflow-hidden relative'>
      <motion.div
        className='w-full sm:w-6/12'
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={motionLeftVariant}
      >
        <h3 className='text-4xl text-secondary-gray font-bold mb-10 text-center sm:text-left'>
          Good headphones and loud music is all you need
        </h3>
        {/* map spec */}
        {
          specifications.map((item) => (
            <div key={item.title} className='flex gap-3 mb-4 items-center justify-center'>
              <Image
                src={item.img}
                alt={item.title}
              />
              <div>
                <p className='text-2xl text-secondary-gray dark:text-white font-medium'>{item.title}</p>
                <p className=' text-secondary-gray/70 dark:text-white/70'>{item.desc}</p>
                <a className='text-primary-red font-medium' href="">Learn More</a>
              </div>
            </div>
          ))
        }
      </motion.div>

      <motion.div 
        className='w-full sm:w-6/12'
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={motionRightVariant}  
      >
        <Image
          src={img}
          alt='headphones'
          className='w-9/12 m-auto sm:w-full'
        />
      </motion.div>
    </div>
  )
}
