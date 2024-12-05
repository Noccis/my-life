import React from 'react'
import Authenticator from '../components/Authenticator';

const LandingPage = () => {
  return (
    <div id='landing-page' className='main-padding'>
        <h3>Landing page.</h3>
        <p>Här ska det finnas:</p>
        <ul>
            <li>Överblick över veckan</li>
            <li>Knapp som lägger till händelser i veckan</li>       
        </ul>
        <Authenticator />
    </div>
  )
}

export default LandingPage;