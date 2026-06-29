import React from 'react'

// Header component for the application
export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container-custom py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio Generator</h1>
            <p className="text-gray-600 mt-1">Create your professional portfolio in minutes</p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              ✨ No Code Required
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
