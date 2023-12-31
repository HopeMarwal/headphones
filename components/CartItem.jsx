'use client'
// Image
import Image from "next/image"
// Components
import { Rating } from "react-simple-star-rating"
// Hooks
import { useSession } from "next-auth/react"
import { useState } from "react"
//Icons 
import { AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai'

export default function CartItem({ product, quantity, id, handleChangeQty, cart_id, handleDeleteItem }) {
  // Session
  const { data: session } = useSession()
  // State
  const [deleteStatus, setDeleteStatus] = useState('default');

  const handleQuantity = async (action) => {
    let newQty;
    // Decrease / increase action
    if(action === 'decr') {
      newQty = quantity - 1
    } else {
      newQty = quantity + 1
    }

    try {
      // Handle update quantity value in db
      const res = await fetch('/api/cart/update', {
        method: 'PATCH',
        body: JSON.stringify({
          userId: session?.user.id,
          quantity: newQty,
          productId: product._id
        })
      })
      if(res.ok) {
        // Pass changes to local cart
        handleChangeQty(newQty, id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (prod_id) => {
    setDeleteStatus('process')
    try {
      // Handle delete product from collection
      const res = await fetch(`/api/cart/delete/${cart_id}/${product._id}`, {
        method: 'DELETE'
      })
      if(res.ok) {
        // Button delete status
        setDeleteStatus('done')

        // Handle delete from local cart & btn status
        setTimeout(() => {
          setDeleteStatus('default')
          handleDeleteItem(prod_id)
        }, 500);     
      }
    } catch (error) {
      console.log(error)
    } 
  }

  const processBtn = <div role="status">
                      <svg aria-hidden="true" className="w-8 h-8 mr-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>

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
        <p className="capitalize font-bold text-secondary-gray dark:text-white">{product.name}</p>
        <Rating
          initialValue={product.rating}
          readonly={true}
          allowFraction={true}
          size={20}
        />
        {/* Quantity */}
        <div className="flex border dark:border-gray-400/50 w-fit mt-auto">
          {/* Disabled if quantity = 1 */}
          <button
            disabled={quantity === 1}
            onClick={() => handleQuantity('decr')}
            className="w-8 h-8 flex justify-center items-center text-red-700 bg-secondary-gray/5 dark:bg-white/50 transition-all hover:bg-secondary-gray/10 disabled:opacity-50 disabled:hover:bg-secondary-gray/5"
          > - </button>

          <div className="w-8 h-8 flex justify-center items-center">{quantity}</div>

          <button
            onClick={() => handleQuantity('incr')}
            className="w-8 h-8 flex justify-center items-center text-green-700 bg-secondary-gray/5 dark:bg-white/50"
          > + </button>

        </div>

      </div>

      <div className="flex justify-between flex-col items-end">
        {/* Delete button */}
        <button 
          className="w-8 h-8 flex justify-center rounded-full items-center text-red-700 bg-secondary-gray/5 dark:bg-white/70 transition-all hover:bg-secondary-gray/10 disabled:opacity-50 disabled:hover:bg-secondary-gray/5"
          onClick={() => handleDelete(product._id)}
        >
          {deleteStatus === 'process'
            ? processBtn
            : deleteStatus === 'done'
              ? <AiOutlineCheck className="text-green-700" />
              : <AiOutlineDelete />
          }
        </button>
        
        <p className="text-secondary-gray/70 dark:text-white/70 font-bold">$ {product.price}</p>
      </div>

    </div>
  )
}
