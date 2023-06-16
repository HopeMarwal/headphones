'use client'
import Image from 'next/image'
// import the hook and options type
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState} from "react";
// Images 
import blue from '../public/images/blue.png'
import red from '../public/images/red.png'
import orange from '../public/images/orange.png'

export default function CarouselProducts() {
  const images = [blue, red, orange]
  const [emblaReff,  emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onPrev = () => {
    emblaApi?.scrollPrev()
  }

  const onNext = () => {
    emblaApi?.scrollNext()
  }

  useEffect(() => {
    function selectHandler() {
      // selectedScrollSnap gives us the current selected index.
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    }

    emblaApi?.on("select", selectHandler);
    // cleanup
    return () => {
      emblaApi?.off("select", selectHandler);
    };
  }, [emblaApi]);


  return (
    <div className='py-20'>
      <h3 className='text-center text-5xl text-secondary-gray font-bold'>Our Latest <br />colour collection 2023</h3>
      <div className='relative mt-10 flex items-center'>

      <button
        className='control_btn'
        onClick={() =>  onPrev() }
      >
        {'<'}
      </button>
    
        <div className="w-8/12 m-auto relative overflow-x-hidden py-14" ref={emblaReff}>
          <div className="flex ">
          {
            images.map((item, index) => (
              <div className={`${ selectedIndex === index ? 'selected' : ''} carousel_item__wrapper`} key={index}>
                <div className='carousel_item'>
                  <Image
                    className='w-full h-full object-cover'
                    src={item}
                    alt='headphones'
                  />
                </div>
                  
              </div>
            ))
          }
            
            
          </div>
        </div>
        
        <button
          onClick={() => onNext()}
          className='control_btn'
        >
         {'>'}
        </button>
      </div>
    </div>
  )
}

