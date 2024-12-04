import './App.css'
import Header from './components/Header'
import { Routes, Route} from "react-router-dom"
import LandingPage from './pages/LandingPage'
import NotesPage from './pages/NotesPage'
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div id='all-content' className='flex-column'>
      
      <Header />
      <AuthProvider>
      <main>
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
        </Routes>
      </main>
      </AuthProvider>
    </div>
  )
}

export default App
