'use client'
// Image
import Image from "next/image"
import bag from '@/public/images/bag.png'
// Components
import CartItem from "@/components/CartItem"
// Hooks
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function page() {
  // State
  const [ cartItems, setCartItems ] = useState(null);
  const [ total, setTotal ] = useState(null)
  // Hooks
  const { data: session } = useSession()

 
  useEffect(() => {
    //Fetch cart data 
    const fetchCart = async () => {
      const res = await fetch(`/api/cart/${session?.user.id}`)
      const data = await res.json()
      // Count total
      let totalCount = calculateTotal(data)
      setTotal(totalCount)
      setCartItems(data)
    }
    if(session?.user.id) fetchCart()
  }, [session?.user.id])

 
  const handleChange = (qty, id) => {
    
    let newCart = [...cartItems]

    // Change qty value
    newCart[0].products.forEach(el => {
      if( el._id === id) {
        el.quantity = qty
      }
    });

    // Calc total
    let totalCount = calculateTotal(newCart)
    setCartItems(newCart)
    setTotal(totalCount)
    
  }

  const calculateTotal = (data) => {
    let totalCount = 0
    data[0].products.forEach(el => {
      totalCount = totalCount + el.quantity * el.product_id.price
    });
    return totalCount
  }

  return (
    <div>
      <div className='h-40 bg-primary-red'></div>
      <div className="relative p-10">
        <Image  
          className="absolute left-1/2 -top-3/4 -translate-x-1/2"
          src={bag}
          width={150}
          height={150}
          alt='icon cart'
        />
      </div>
      <div className="flex max-w-xl m-auto p-3 flex-wrap">
        {/* Cart Items container */}
        <div className="flex w-full flex-wrap">
          { cartItems &&
            cartItems[0].products.map((item) => (
              <CartItem
                key={item._id}
                product={item.product_id}
                quantity={item.quantity}
                id={item._id}
                handleChangeQty={handleChange}
              />
            ))
          }
        </div>
        {/* cart footer */}
        <div className="w-full border">
          <div className="flex justify-between items-center p-3">
            <p className="font-bold">Total:</p>
            <p className="font-bold text-secondary-gray/70 text-lg">$ {total}</p>
          </div>
          
          <button className="w-full bg-primary-red text-white py-3 font-bold active:bg-secondary-gray hover:bg-secondary-gray transition-all">
            Checkout
          </button>
        </div>
      </div>

    </div>
  )
}
