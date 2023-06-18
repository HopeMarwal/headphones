'use client'
import Image from "next/image"
import { Rating } from "react-simple-star-rating"

export default function CartItem({ product }) {
  return (
    <div className="product_item">
      <div className="w-3/12 h-24 sm:h-36 bg-secondary-gray/10">
        <Image src={product.img} alt={product.name} className="h-full object-contain"/>
      </div>

      <div className="flex flex-col justify-between mr-auto">
        <p className="capitalize font-bold text-secondary-gray">{product.name}</p>
        <Rating
          initialValue={product.rating}
          readonly={true}
          allowFraction={true}
          size={20}
        />
        <div className="flex border w-fit mt-auto">
          <div className="w-8 h-8 flex justify-center items-center text-red-700 bg-secondary-gray/10">-</div>
          <div className="w-8 h-8 flex justify-center items-center">1</div>
          <div className="w-8 h-8 flex justify-center items-center text-green-700 bg-secondary-gray/10">+</div>
        </div>

      </div>

      <div className="flex items-end">
        <p className="text-secondary-gray/70 font-bold">$ {product.price}</p>
      </div>

    </div>
  )
}
