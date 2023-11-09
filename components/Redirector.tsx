'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Redirector = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.push('/'), 3000)
  }, [])

  return (
    <div className="w-12 h-12 rounded-full border-t-blue-500 border-r-blue-500 animate-spin border-8"></div>
  )
}
export default Redirector
