import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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
            <Route element={<Layout />}>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/resources" element={<Resources/>}/>
              <Route path="/gallery" element={<Gallery/>}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
