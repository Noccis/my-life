import './App.css'
import Header from './components/Header'
import { Routes, Route} from "react-router-dom"
import Landing from './pages/LandingPage'
import Notes from './pages/Notes'
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <div id='all-content' className='flex-column'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={ <LandingPage /> }/>
          <Route path='/notes' element={ <Notes /> } />
        </Routes>
      </main>
    </div>
  )
}

export default App
