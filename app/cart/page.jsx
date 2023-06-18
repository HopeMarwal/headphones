import Image from "next/image"
import bag from '@/public/images/bag.png'
import { products } from "@/utils/data"
import CartItem from "@/components/CartItem"

export default function page() {
  return (
    <div>
      <div className='h-40 bg-primary-red'></div>
      <div className="relative p-10">
        <Image  
          className="absolute left-1/2 -top-3/4 -translate-x-1/2"
          src={bag}
          width={150}
          height={150}
        />
      </div>
      <div className="flex max-w-xl m-auto p-3 flex-wrap">
        <div className="flex w-full flex-wrap">
          {
            products.map((item) => (
              <CartItem key={item.id} product={item} />
            ))
          }
        </div>
        <div className="w-full border">
          <div className="flex justify-between items-center  p-3">
            <p className="font-bold">Total</p>
            <p className="font-bold text-secondary-gray/70 text-lg">$ 245</p>
          </div>
          
          <button className="w-full bg-primary-red text-white py-3 font-bold active:bg-secondary-gray hover:bg-secondary-gray transition-all">Checkout</button>
        </div>
      </div>

    </div>
  )
}
