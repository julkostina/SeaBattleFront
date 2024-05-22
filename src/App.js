import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Play from './pages/Play';
import ActualPlay from './pages/ActualPlay';
import NextPlayer from './pages/NextPlayer';
// import Result from './pages/Result';
import ChoosePlacement from './pages/ChoosePlacement';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/play" element={<Play />} />
        <Route path="/" element={<Main />} />
        <Route path="/next-player" element={<NextPlayer />} />
        <Route path="/actual-play" element={<ActualPlay />} />
        <Route path="/choose-placement" element={<ChoosePlacement />} />
        {/* <Route path="/results" element={<Result />} /> */}
      </Routes>
    </Router>
    
  );
}

export default App;