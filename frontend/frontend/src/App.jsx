import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [backendData, setBackendData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDataFromBackend = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('http://localhost:5000/api/data')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setBackendData(data)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center space-x-4 mb-6">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="h-16" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="h-16 animate-spin-slow" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Vite + React + Flask
        </h1>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Count is {count}
          </button>
        </div>

        <div className="mb-6">
          <button 
            onClick={fetchDataFromBackend}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch Data from Flask Backend'}
          </button>
        </div>

        {error && (
          <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
            Error: {error}
          </div>
        )}

        {backendData && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Backend Response:</h2>
            <p className="mb-2">{backendData.message}</p>
            <ul className="list-disc pl-5">
              {backendData.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
