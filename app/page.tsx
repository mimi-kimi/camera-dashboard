'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Dashboard() {
  const [snapshots, setSnapshots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    fetchSnapshots()
  }, [])

  const fetchSnapshots = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/snapshots')
      const data = await response.json()
      
      if (response.ok) {
        setSnapshots(data)
      } else {
        setError(data.error || 'Failed to fetch snapshots')
      }
    } catch (err) {
      setError('Error connecting to server')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading snapshots...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl">⚠️ Error</p>
          <p>{error}</p>
          <button 
            onClick={fetchSnapshots}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📸 Flood Camera Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                {snapshots.length} snapshots captured
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                ● Live
              </span>
              <button
                onClick={fetchSnapshots}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {snapshots.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No snapshots found. Wait for the first capture!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snapshots.map((snapshot) => (
              <div
                key={snapshot.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedImage(snapshot)}
              >
                <div className="relative aspect-video bg-gray-100">
                  {snapshot.image_data && (
                    <img
                      src={`data:image/jpeg;base64,${snapshot.image_data}`}
                      alt={`Camera ${snapshot.camera_id} - ${formatDate(snapshot.timestamp)}`}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        Camera {snapshot.camera_id}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(snapshot.timestamp)}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      #{snapshot.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full bg-white rounded-xl overflow-hidden">
            <div className="relative">
              <img
                src={`data:image/jpeg;base64,${selectedImage.image_data}`}
                alt={`Camera ${selectedImage.camera_id}`}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Camera {selectedImage.camera_id}</p>
                  <p className="text-sm text-gray-500">{formatDate(selectedImage.timestamp)}</p>
                </div>
                <span className="text-sm text-gray-500">ID: {selectedImage.id}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}