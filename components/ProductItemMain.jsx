import img from '../public/images/product_main_banner.png'
import Image from 'next/image'
// Data
import { specifications } from '@/utils/data'

export default function ProductItemMain() {
  return (
    <div className='flex flex-wrap p-3 items-center'>
      <div className='w-full sm:w-6/12'>
        <h3 className='text-4xl text-secondary-gray font-bold mb-10 text-center sm:text-left'>
          Good headphones and loud music is all you need
        </h3>
        {/* map spec */}
        {
          specifications.map((item) => (
            <div key={item.title} className='flex gap-3 mb-4 items-center justify-center'>
              <Image
                src={item.img}
                alt={item.title}
              />
              <div>
                <p className='text-2xl text-secondary-gray font-medium'>{item.title}</p>
                <p className=' text-secondary-gray/70'>{item.desc}</p>
                <a className='text-primary-red font-medium' href="">Learn More</a>
              </div>
            </div>
          ))
        }
      </div>
      <div className='w-full sm:w-6/12'>
        <Image
          src={img}
          alt='headphones'
          className='w-9/12 m-auto sm:w-full'
        />
      </div>
    </div>
  )
}
