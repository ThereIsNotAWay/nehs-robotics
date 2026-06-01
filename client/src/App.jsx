import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/resources" element={<Resources/>}/>
            <Route path="/gallery" element={<Gallery/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
