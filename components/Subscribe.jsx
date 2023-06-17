'use client'
import { useState } from "react"

export default function Subscribe() {
  const [email, setEmail] = useState('');
  return (
    <div className='subscribe'>
      <div className="w-full sm:w-10/12 md:w-8/12 m-auto py-12 rounded-3xl bg-red-50">
        <h3>Subscribe</h3>
        <p className="text-center my-5 font-normal opacity-70">Subscribe to get our latest promotion</p>
        <form action="/" className="w-full sm:w-9/12 m-auto text-center flex items-stretch my-5 justify-center">
          <input  
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
          <button className="btn secondary" type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  )
}
