import React from 'react'
import './Sidebar.css'

function Sidebar() {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar" style={{ width: '290px' }}>
          <h3 href="#home" className='hh'>FASHION_STORE</ h3>
    <ul className="nav nav-pills mt-4 flex-column mb-auto">
        
        <li className="nav-item">
            <a href="#" >
                Dashboard
            </a>
        </li>
        <li>
            <a href="#" >
                Books
            </a>
        </li>
        <li>
            <a href="#" >
                Students
            </a>
        </li>
        <li>
            <a href="#" >
                Reservations
            </a>
        </li>
        <li>
            <a href="#" >
                Profile
            </a>
        </li>
    </ul>
</div>
  )
}

export default Sidebar

