'use client'
//import { products } from "@/utils/data"
import ProductCard from "./ProductCard"
import { useEffect, useState } from "react"

export default function Products(props) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    //Fetch req
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      const data = await res.json()

      console.log('data updated on product page')
      console.log(data)
      
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <div className="p-3">
      <h3 className="my-20">{props.heading}</h3>
      <div className="flex flex-wrap w-full justify-between">
        {
          products?.map((product) => (
            <ProductCard data={product} key={product._id} />
          ))
        }
      </div>
      
    </div>
  )
}
