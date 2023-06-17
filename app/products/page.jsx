import Products from "@/components/Products"
export default function page() {
  return (
    <div className="min-h-screen">
      <div className="bg-primary-red h-20"></div>
      <div className="max-w-6xl m-auto ">
        <Products heading='Products'/>
      </div>
      
    </div>
  )
}
