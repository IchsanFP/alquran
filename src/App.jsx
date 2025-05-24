import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Testing from './pages/DetailPage';
// import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:namaLatin" element={<Testing/>} />
      </Routes>
    </Router>
  );
}

export default App;