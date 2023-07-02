'use client'
// Image
import Image from "next/image"
import bag from '@/public/images/bag.png'
// Components
import CartItem from "@/components/CartItem"
// Hooks
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// Next navigation
import Link from "next/link";

export default function page() {
  // State
  const [ cartItems, setCartItems ] = useState(null);
  const [loading, setLoading] = useState(true);
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
      setLoading(false)
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
 
  if( loading ) {
    return (
      <div className="min-h-screen">
        <div className='h-40 bg-primary-red'></div>

          <div className="relative p-10 ">
            <Image  
              className="absolute left-1/2 -top-3/4 -translate-x-1/2"
              src={bag}
              width={150}
              height={150}
              alt='icon cart'
            />
          </div>

          <div role="status" className="flex w-full h-40 justify-center items-center">
            <svg aria-hidden="true" className="w-8 h-8 mr-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className='h-40 bg-primary-red'></div>
      {/* Image banner */}
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

      {/* If no products display emptyCart else render items */}
      <div className="flex max-w-xl m-auto p-3 flex-wrap">
        {cartItems?.products.length 
          ? (
            <>
              <div className="flex w-full flex-wrap">
                {/* Map over products */}
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
              {/* Cart footer */}
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
