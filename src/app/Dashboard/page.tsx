import React from 'react'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import Footerlist from './Components/Footerlist'
function page() {
  return (
    <div>
        <Navbar/>
        <div>
          <Dashboard/>
        </div>
        <footer >
        <Footerlist/>
        </footer>
    </div>
  )
}

export default page