
import React from 'react'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
function page() {
  return (
    <div>
        <Navbar/>
        <div>
          <Dashboard/>
        </div>
    </div>
  )
}

export default page