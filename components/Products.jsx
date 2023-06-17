import { products } from "@/utils/data"
import ProductCard from "./ProductCard"

export default function Products(props) {

  return (
    <div className="p-3">
      <h3 className="my-20">{props.heading}</h3>
      <div className="flex flex-wrap w-full justify-between">
        {
          products.map((product) => (
            <ProductCard data={product} key={product.id} />
          ))
        }
      </div>
      
    </div>
  )
}
