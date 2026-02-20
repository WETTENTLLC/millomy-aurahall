'use client'
import { useEffect, useState } from 'react'

export default function Admin() {
  const [visitors, setVisitors] = useState([])

  useEffect(() => {
    // Get stored visitor data
    const stored = localStorage.getItem('all_visitors') || '[]'
    setVisitors(JSON.parse(stored))
  }, [])

  return (
    <div style={{ padding: '2rem', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Visitor Analytics</h1>
      <p>Total Visitors: {visitors.length}</p>
      
      <div style={{ marginTop: '2rem' }}>
        {visitors.map((visitor, i) => (
          <div key={i} style={{ 
            border: '1px solid #00ffff', 
            padding: '1rem', 
            margin: '1rem 0',
            borderRadius: '8px'
          }}>
            <p><strong>Location:</strong> {visitor.utm_content}</p>
            <p><strong>Time:</strong> {new Date(visitor.timestamp).toLocaleString()}</p>
            <p><strong>Source:</strong> {visitor.utm_source}</p>
            <p><strong>Device:</strong> {visitor.screen_resolution}</p>
          </div>
        ))}
      </div>
    </div>
  )
}