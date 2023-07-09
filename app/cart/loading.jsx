import LoadingSpinner from '@/components/LoadingSpinner'

export default function loading() {
  return (
    <div className='w-screen h-screen flex items-center justify-center dark:bg-neutral-800'>
      <LoadingSpinner />
    </div>
  )
}
