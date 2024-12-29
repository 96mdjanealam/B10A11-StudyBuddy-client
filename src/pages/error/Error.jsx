import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4 text-gray-700">
        Hey buddy! You&apos;re on the wrong way 😀
      </p>
      <Link to="/" className="mt-6">
        <button className="btn btn-outline btn-error">Go back to Home</button>
      </Link>
    </div>
  )
}