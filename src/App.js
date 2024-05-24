import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Play from './pages/Play';
import ActualPlay from './pages/ActualPlay';
import NextPlayer from './pages/NextPlayer';
import React from "react";
// import Result from './pages/Result';


// let music = new Audio({
//   loop: true,
//   volume: 1,
//   src: '/sounds/328713-Ambience_Exterior_Wave_Boulders_Pier_Between_Rocks_More_Distant_Waves_Hard_Loop.wav'
// })



// music.play();

function App() {
  const BACKGROUND_AUDIO = React.createRef();
  const HIT_AUDIO = React.createRef();

  const volume = parseInt(localStorage.getItem('volume') ?? '50') / 100;

  React.useEffect(() => {
    BACKGROUND_AUDIO.current.volume = volume;
  }, [BACKGROUND_AUDIO, volume]);

  React.useEffect(() => {
    HIT_AUDIO.current.volume = volume;
  }, [HIT_AUDIO, volume]);

  return (
    <Router>
      <Routes>
        <Route path="/play" element={<Play BACKGROUND_AUDIO={BACKGROUND_AUDIO} />} />
        <Route path="/" element={<Main BACKGROUND_AUDIO={BACKGROUND_AUDIO} />} />
        <Route path="/next-player" element={<NextPlayer BACKGROUND_AUDIO={BACKGROUND_AUDIO} />} />
        <Route path="/actual-play" element={<ActualPlay BACKGROUND_AUDIO={BACKGROUND_AUDIO} HIT_AUDIO={HIT_AUDIO} />} />
        {/* <Route path="/results" element={<Result />} /> */}
      </Routes>
      <audio ref={BACKGROUND_AUDIO} id="background-music" src="/sounds/328713-Ambience_Exterior_Wave_Boulders_Pier_Between_Rocks_More_Distant_Waves_Hard_Loop.wav" loop autoPlay />
      <audio ref={HIT_AUDIO} id="hit-music" src="/sounds/249101-Light_Naval_Cannon_Blast_4.wav" />
    </Router>
  );
}

export default App;