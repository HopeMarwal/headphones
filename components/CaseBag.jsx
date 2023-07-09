'use client'
import Image from "next/image"
import img from '../public/images/case.png'
import { motion } from "framer-motion"

export default function CaseBag() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
  
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}
  
  return (
    <div className="case">
      <div className="w-full md:w-7/12">
        <Image className="drop_shadow" src={img} alt='case for headphones'/>
      </div>
      <div className="w-full sm:w-7/12 m-auto md:w-5/12">
        <h3 className="text-left">Whatever you get in the box</h3>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          exit='hidden'
        >
          <motion.li variants={item} >5A charger</motion.li>
          <motion.li variants={item} >Extra battery</motion.li>
          <motion.li variants={item} >Sophisticated bag</motion.li>
          <motion.li variants={item} >User manual guide</motion.li>
        </motion.ul>
      </div>
    </div>
  )
}
