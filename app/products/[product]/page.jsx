'use client'
//hooks
import { useState, useEffect } from "react"
//data
import { products } from "@/utils/data"
//Image 
import Image from 'next/image'
// Images spec
import micro from '@/public/icons/micro.svg'
import bluetooth from '@/public/icons/bluetooth.svg'
import battery from '@/public/icons/battery.svg'
// Icons
import { Rating } from "react-simple-star-rating"

export default function page({ params }) {
  const product = products.filter((item) => item.id === params.product)[0]

  return (
    <div>
      <div className="h-20 bg-primary-red"></div>
      <div className='product_page'>

        {/* Product Image */}
        <div className='w-full sm:w-6/12 pr-0 sm:pr-10'>
          <Image
            src={product.img}
            alt='headphones'
            className='w-7/12 m-auto '
          />
          
          <div className="flex flex-wrap w-full sm:w-7/12 m-auto mt-6 ">
            {/* Add to cart */}
            <div className="w-full flex flex-wrap justify-between text-xl items-center">
              <p className="text-primary-red text-2xl font-bold">$ {product.price}</p>
              <Rating
                initialValue={product.rating}
                readonly={true}
                allowFraction={true}
              />
              <button className="btn secondary mt-4 mx-0 sm:mx-auto w-full">
                Add to Cart
              </button>
              
            </div>
          </div>
        </div>
        
        {/* Product specifications */}
        <div className='w-full sm:w-6/12'>
          <h3 className='text-4xl text-secondary-gray font-bold my-10 text-center sm:text-left capitalize'>
            {product.name}
          </h3>
          {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className='flex gap-3 mb-4 items-center justify-center sm:justify-start'>
                <Image
                  src={key.toString() === 'battery' ? battery : key.toString() === 'microphone' ? micro : bluetooth}
                  alt={key}
                />
                <div>
                  <p className='text-2xl text-secondary-gray font-medium capitalize'>{key}</p>
                  <p className=' text-secondary-gray/70'>{value}</p>
                  <a className='text-primary-red font-medium' href="">Learn More</a>
                </div>
              </div>
            ))
          }
        </div>
      
      </div>
  
    </div>
  )
}


