import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Register from './pages/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/resources" element={<Resources/>}/>
              <Route path="/gallery" element={<Gallery/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Register/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
