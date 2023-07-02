import LoadingSpinner from "@/components/LoadingSpinner";

export default function loading() {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg_red '>
      <LoadingSpinner />
    </div>
  )
}
