'use client'
// Hooks 
import { useState } from "react"
import { useSession } from "next-auth/react"
//Icon
import Image from "next/image"
import { BsCartCheckFill,  BsFillCartFill} from 'react-icons/bs'
// Rating 
import { Rating } from "react-simple-star-rating"
// Next nav
import Link from "next/link"

export default function ProductCard({ data }) {
  // State
  const [status, setStatus] = useState('default');
  const { data: session } = useSession()

  const handleAddToCart = async () => {
    if(!session) {
      window.alert('Please login to add items in cart')
      return
    }
    setStatus('process')
    try {
      // API POST new product to cart db
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          quantity: 1,
          productId: data._id
        })
      })
      // Product Item already in cart
      if(res.status === 208) {
        window.alert('Already in the cart')
      }
      // Product successfully added to cast
      if(res.status === 200) {
        setStatus('done')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setStatus('default')
      }, 1000);
      
    }
  }
  
  //Set bg color of image container based on main headphones color
  const bg_color = data.name.includes('red') 
                    ? 'bg-pink-100' 
                    : data.name.includes('green') 
                      ? 'bg-green-200'
                      : 'bg-sky-200'
                
  const processBtn = <div role="status">
                      <svg aria-hidden="true" className="w-8 h-8 mr-0 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                
  return (
    <div className="w-full sm:w-9/12 m-auto md:w-33pr px-4 mb-9">
      {/* Image */}
      <div className={`${bg_color} h-56 relative rounded-3xl`}>
        <Link href={`/products/${data._id}`}>
          <Image
            src={data.img}
            alt={data.name}
            className="product_image"
            width={200}
            height={200}
          />
        </Link>

        {/* Add to cart button */}
        <div
          onClick={handleAddToCart}
          className={`${bg_color} absolute cursor-pointer disabled:cursor-wait -right-6 -top-6 p-3 rounded-full w-14 h-14 flex items-center justify-center border-4 border-white `}
          disabled={status !== 'default'}
        >
          {
            status === 'process' 
            ? processBtn
            : status == 'done'
              ? <BsCartCheckFill className="text-green-700 text-xl"/>
              : <BsFillCartFill className="text-secondary-gray/60 text-xl" />
          }
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
     
    </div>
  )
}
