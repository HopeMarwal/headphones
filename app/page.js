// Components
import CarouselProducts from "@/components/CarouselProducts"
import ProductItemMain from "@/components/ProductItemMain"
import Products from "@/components/Products"
import CaseBag from "@/components/CaseBag"
import Subscribe from "@/components/Subscribe"
import Header from "@/components/Header"

export default function Home() {
  return (
    <main>
      {/* Hero banner */}
      <Header />
      {/* Product image carousel */}
      <div className="max-w-6xl mx-auto">
        <CarouselProducts />
        <ProductItemMain />
        <Products heading='Our Latest Product'/>
        <CaseBag />
        <Subscribe />
      </div>
    </main>
  )
}
