'use client'
// Image
import Image from "next/image"
// Components
import { Rating } from "react-simple-star-rating"
// Hooks
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function CartItem({ product, quantity, id, handleChangeQty }) {
  // State data
  const [qty, setQty] = useState(quantity);
  const { data: session } = useSession()

  const handleQuantity = async (action) => {
    let newQty;
    if(action === 'decr') {
      newQty = quantity - 1
    } else {
      newQty = quantity + 1
    }
    try {
      // API PATCH new qty value to db
      const res = await fetch('/api/cart/update', {
        method: 'PATCH',
        body: JSON.stringify({
          userId: session?.user.id,
          quantity: newQty,
          productId: product._id
        })
      })
      if(res.ok) {
        handleChangeQty(newQty, id)
      }
    } catch (error) {
      console.log(error)
    } finally {
      //
    }
  }
  
  return (
    <div className="product_item">
      <div className="w-3/12 h-24 sm:h-36 bg-secondary-gray/10">
        <Image
          src={product.img}
          width={100}
          height={96}
          alt={product.name}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col justify-between mr-auto">
        <p className="capitalize font-bold text-secondary-gray">{product.name}</p>
        <Rating
          initialValue={product.rating}
          readonly={true}
          allowFraction={true}
          size={20}
        />
        {/* Quantity */}
        <div className="flex border w-fit mt-auto">
          {/* Disabled if quantity = 1 */}
          <button
            disabled={quantity === 1}
            onClick={() => handleQuantity('decr')}
            className="w-8 h-8 flex justify-center items-center text-red-700 bg-secondary-gray/5 transition-all hover:bg-secondary-gray/10 disabled:opacity-50 disabled:hover:bg-secondary-gray/5"
          >
            -
          </button>

          <div className="w-8 h-8 flex justify-center items-center">{quantity}</div>

          <button
            onClick={() => handleQuantity('incr')}
            className="w-8 h-8 flex justify-center items-center text-green-700 bg-secondary-gray/5"
          >
            +
          </button>
        </div>

      </div>

      <div className="flex items-end">
        <p className="text-secondary-gray/70 font-bold">$ {product.price}</p>
      </div>

    </div>
  )
}
