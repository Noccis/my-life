import React from 'react'
import Authenticator from '../components/Authenticator';
import WeekOverview from '../components/WeekOverview';

const LandingPage = () => {
  return (
    <div id='landing-page' className='main-padding'>
        <h3>Landing page.</h3>
        <WeekOverview />
        <Authenticator />
    </div>
  )
}

export default LandingPage;