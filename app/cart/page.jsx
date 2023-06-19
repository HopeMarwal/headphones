'use client'
// Image
import Image from "next/image"
import bag from '@/public/images/bag.png'
// Components
import CartItem from "@/components/CartItem"
// Hooks
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
      let totalCount = calculateTotal(data[0].products)
      setTotal(totalCount)
      setCartItems(data[0])
    }
    if(session?.user.id) fetchCart()
  }, [session?.user.id])

 
  const handleChange = (qty, id) => {
    
    let newCart = {...cartItems}

    // Change qty value
    newCart.products.forEach(el => {
      if( el._id === id) {
        el.quantity = qty
      }
    });

    // Calc total
    let totalCount = calculateTotal(newCart.products)
    setCartItems(newCart)
    setTotal(totalCount)
    
  }

  const handleDelete = (id) => {
    let products = [...cartItems.products]

    //Find product to delete by id
    products = products.filter(el => el.product_id._id !== id )

    //Recalculate total
    let totalCount = calculateTotal(products)
    setCartItems({...cartItems, products: products})
    setTotal(totalCount)

  }


  const calculateTotal = (data) => {
    let totalCount = 0
    data.forEach(el => {
      totalCount = totalCount + el.quantity * el.product_id.price
    });
    return totalCount
  }

  const emptyCart = <div className="flex max-w-xl m-auto p-3 font-bold text-4xl flex-wrap text-center">
                      <p className="w-full">Your cart is empty.</p>
                      <p className="w-full">
                        Visit {' '}
                        <Link className="text-primary-red" href='/products'>product page</Link>.
                      </p>
                    </div>
 

  return (
    <div className="min-h-screen">
      <div className='h-40 bg-primary-red'></div>
      <div className="relative p-10 ">
        <div className="z-10 absolute left-1/2 -top-16 -translate-x-1/2 rounded-full w-7 h-7 bg-white text-secondary-gray flex items-center justify-center">
          {cartItems ? cartItems.products.length : '0' }
        </div>
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
        {
          cartItems?.products.length 
            ? (
              <>
                <div className="flex w-full flex-wrap">
                  { 
                    cartItems.products.map((item) => (
                      <CartItem
                        cart_id={cartItems._id}
                        key={item._id}
                        product={item.product_id}
                        quantity={item.quantity}
                        id={item._id}
                        handleChangeQty={handleChange}
                        handleDeleteItem={handleDelete}
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
              </>)
            : emptyCart
        }
        
      </div>
      
      

    </div>
  )
}
