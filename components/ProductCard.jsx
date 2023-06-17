'use client'

import Image from "next/image"
//Icon
import cart from '../public/icons/cart_icon.svg'
// Rating 
import { Rating } from "react-simple-star-rating"
// Next nav
import Link from "next/link"

export default function ProductCard({ data }) {
  
  const bg_color = data.name.includes('red') 
                    ? 'bg-pink-100' 
                    : data.name.includes('green') 
                      ? 'bg-green-200'
                      : 'bg-sky-200'
  return (
    <Link href={`/products/${data.id}`} className="w-full sm:w-9/12 m-auto md:w-33pr px-4 mb-9">
      {/* Image */}
      <div className={`${bg_color} h-56 relative rounded-3xl`}>
        <Image
          src={data.img}
          alt={data.name}
          className="product_image"
        />
        <div className={`${bg_color} absolute -right-6 -top-6 p-3 rounded-full w-14 h-14 flex items-center justify-center border-4 border-white `}>
          {/* TODO: handle add to cart item */}
          <Image src={cart} alt='cart' />
        </div>
        
      </div>

      {/* Desc */}
      <div className="desc">
        <div className="flex justify-between items-center w-full">
          <Rating
            initialValue={data.rating}
            readonly={true}
            allowFraction={true}
          />
          <span className="font-bold">{data.rating}</span>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="capitalize py-2 text-lg">{data.name}</p>
          <p className="text-lg">$ {data.price}</p>
        </div>
        
      </div>
     
    </Link>
  )
}
