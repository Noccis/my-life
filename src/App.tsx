import './App.css'
import Header from './components/Header'
import { Routes, Route} from "react-router-dom"
import LandingPage from './pages/LandingPage'
import NotesPage from './pages/NotesPage'
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage'
import Footer from './components/Footer'

function App() {
  return (
    <div id='all-content' className='flex-column'>
      
      <Header />
      <AuthProvider>
      <main className='flex-column flex-align-center'>
        <Routes>
        <Route path="/" element={<LandingPage />} />
      <Route
        path="/notes"
        element={
          <PrivateRoute>
            <NotesPage />
          </PrivateRoute>
        }
      />
      <Route 
      path='/profile'
      element={ 
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
       } 
      />
        </Routes>
      </main>
      </AuthProvider>
      <Footer />
    </div>
  )
}

export default App
