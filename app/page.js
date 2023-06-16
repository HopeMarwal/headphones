import Image from "next/image"
// Hero banner image
import heroImg from '../public/images/hero_banner_img.png'

export default function Home() {
  return (
    <main>
      {/* Hero banner */}
      <header>

        <div className="max-w-6xl m-auto flex">
          <div className="w-6/12">
            <Image
              src={heroImg}
              alt='beats headphones'
              height={500}
            />
          </div>

          <div className="w-6/12 flex flex-col justify-center">
            <p className="uppercase text-lg text-white tracking-widest">
              hear it, feel it
            </p>
            <p className="uppercase text-8xl text-white font-bold">
              move<br />with the<br />music
            </p>
            <div className="py-5 flex gap-4 items-center text-white font-bold">
              <p className="text-4xl">$ 435</p>
              <span className="border-l border-l-white/70 pl-4 text-3xl opacity-70 line-through">$ 465</span>
            </div>
            
            <button className="btn">
              buy now
            </button>
          </div>
        </div>
  
      </header>

    </main>
  )
}
