// import logo from './logo.svg';
// import './App.css';
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import PreviewPage from './pages/PreviewPage';
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/preview' element={<PreviewPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
