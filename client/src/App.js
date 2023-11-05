import './App.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home'
import Feedback from './pages/Feedback'

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
                <Link to="/feedback">Feedback</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;