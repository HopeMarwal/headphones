// Components
import CarouselProducts from "@/components/CarouselProducts"
import ProductItemMain from "@/components/ProductItemMain"
import Products from "@/components/Products"
import CaseBag from "@/components/CaseBag"
import Subscribe from "@/components/Subscribe"
import Header from "@/components/Header"

export default function Home() {
  return (
    <>
      {/* Hero banner */}
      <Header />
      {/* Product image carousel */}
      <main className="max-w-6xl mx-auto relative dark:bg-neutral-800">
        <CarouselProducts />
        <ProductItemMain />
        <Products heading='Our Latest Product'/>
        <CaseBag />
        <Subscribe />
      </main>
    </>
  )
}
