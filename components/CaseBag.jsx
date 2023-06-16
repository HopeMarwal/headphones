import Image from "next/image"
import img from '../public/images/case.png'

export default function CaseBag() {
  return (
    <div className="case">
      <div className="w-full md:w-7/12">
        <Image src={img} alt='case for headphones'/>
      </div>
      <div className="w-full sm:w-7/12 m-auto md:w-5/12">
        <h3 className="text-left">Whatever you get in the box</h3>
        <ul className="mt-5">
          <li>5A charger</li>
          <li>Extra battery</li>
          <li>Sophisticated bag</li>
          <li>User manual guide</li>
        </ul>
      </div>
    </div>
  )
}
