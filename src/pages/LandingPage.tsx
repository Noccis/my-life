import React from 'react'
import Auth from '../components/Auth';

const LandingPage = () => {
  return (
    <div id='landing-page' className='main-padding'>
        <h3>Landing page.</h3>
        <p>Här ska det finnas:</p>
        <ul>
            <li>Överblick över veckan</li>
            <li>Länk till "kom ihåg" sidan</li>
            <li>Knapp som lägger till händelser i veckan</li>
            <li>Länk till Leons sida</li>
        </ul>
        <Auth />
    </div>
  )
}

export default LandingPage;