import React from 'react'
import { NavLink } from 'react-router-dom'
import "../styling/navigation.css"

const Navigation = () => {
  return (
    <div id='navigation-container'>
        <ul className='flex-row'>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/notes">Notes</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
        </ul>
    </div>
  )
}

export default Navigation