import Products from "@/components/Products"
export default function page() {
  return (
    <div className="min-h-screen dark:bg-neutral-800">
      <div className="bg-primary-red dark:bg-red-950 h-20"></div>
      <div className="max-w-6xl m-auto ">
        <Products heading='Products'/>
      </div>
      
    </div>
  )
}
