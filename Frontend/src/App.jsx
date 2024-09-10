import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SingIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'


function App() {

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route element={<PrivateRoute />}>
      <Route path='/profile' element={<Profile />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
