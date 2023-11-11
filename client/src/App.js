import './App.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Users from './pages/Users'
import Feedback from './pages/Feedback'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return ( 
    <BrowserRouter>
      <div className="App">
        <header className="Header">
        <nav>
            <ul className="header-links">
            <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/feedback">Feedback</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;