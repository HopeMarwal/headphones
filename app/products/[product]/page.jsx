'use client'
//hooks
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
//Image 
import Image from 'next/image'
// Images spec
import micro from '@/public/icons/micro.svg'
import bluetooth from '@/public/icons/bluetooth.svg'
import battery from '@/public/icons/battery.svg'
// Components
import { Rating } from "react-simple-star-rating"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function page({ params }) {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('default');
  const { data: session } = useSession()

  useEffect(() => {
    //Fetch single product data 
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/product/${params.product}`)
      const data = await res.json()
      setProduct(data)
    }
    fetchProduct()
  }, [params.product])

  const handleAddToCart = async () => {
    setStatus('process')
    try {
      // API POST new item to cart
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          quantity: 1,
          productId: product._id
        })
      })
      // If item is already in cart
      if(res.status === 208) {
        window.alert('Already in the cart')
      }
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

  const processBtn = <><div role="status" className="flex items-center">
                      <svg aria-hidden="true" className="w-8 h-8 mr-2 inline-block text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg><span>Processing...</span>
                      <span className="sr-only">Loading...</span>
                    </div></>
  
  return (
    <div className="dark:bg-neutral-800">
      <div className="h-20 bg-primary-red dark:bg-red-950"></div>
      { product ?
      <div className='product_page'>

        <div className='w-full sm:w-6/12 pr-0 sm:pr-10'>
          {/* Product Image */}
          <Image
            className='m-auto'
            src={product.img}
            alt='headphones'
            width={300}
            height={300}
          />
          {/* Product description */}
          <div className="flex flex-wrap w-full sm:w-7/12 m-auto mt-6 ">
            
            <div className="w-full flex flex-wrap justify-between text-xl items-center">
              <p className="text-primary-red text-2xl font-bold">$ {product?.price}</p>
              <Rating
                initialValue={product.rating}
                readonly={true}
                allowFraction={true}
              />
              {/* Add to cart */}
              <button onClick={handleAddToCart} className="btn secondary mt-4 mx-0 sm:mx-auto w-full">
                { status === 'process'
                  ? processBtn
                  : status === 'done'
                    ? 'Success'
                    : 'Add to cart'
                }
              </button>
              
            </div>
          </div>
        </div>
        
        {/* Product specifications */}
        <div className='w-full sm:w-6/12'>
          <h3 className='text-4xl text-secondary-gray dark:text-white font-bold my-10 text-center sm:text-left capitalize'>
            {product.name}
          </h3>
          {Object.entries(product?.specifications).map(([key, value]) => (
              <div key={key} className='flex gap-3 mb-4 items-center justify-center sm:justify-start'>
                <Image
                  src={key.toString() === 'battery' ? battery : key.toString() === 'microphone' ? micro : bluetooth}
                  alt={key}
                />
                <div>
                  <p className='text-2xl text-secondary-gray dark:text-white font-medium capitalize'>{key}</p>
                  <p className=' text-secondary-gray/70 dark:text-white/70'>{value}</p>
                  <a className='text-primary-red font-medium' href="">Learn More</a>
                </div>
              </div>
            ))
          }
        </div>
      
      </div>
      : <div className="h-screen"><LoadingSpinner /></div>
      }
    </div>
  )
}


