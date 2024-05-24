import React from 'react'
import styles from '../styles/Main.css'
import Button from '../components/Button'
import SeaBattleImage from '../assets/Sea Battle.png'
import WavesImage from '../assets/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3BkbWlzYzNiYXRjaDItbG9jMjAwODY2MDQ3OGEtaW1hZ2VfMS5wbmc 1-Photoroom.png-Photoroom.png'
import Modal from '../components/Modal'
import Settings from '../components/Settings'
import { useNavigate } from 'react-router-dom';

function Main({ BACKGROUND_AUDIO = null }) {
  sessionStorage.removeItem('player');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const fileInputRef = React.useRef();

  const onLoadGame = () => {
    fileInputRef.current.click();
  }
  const submit = async (form) => {
    const { volume, ...restForm } = form

    localStorage.setItem('volume', volume);
    BACKGROUND_AUDIO.current.volume = volume / 100;

    setIsModalOpen(false);
    await fetch('http://localhost:8080/initGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(restForm)
    })
    sessionStorage.setItem('player', 1);
    navigate('/play');
  }
  const handleJoinSecondPlayer = () => {
    sessionStorage.setItem('player', 2);
    navigate('/play');
  }
  const fileChanged = (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const data = JSON.parse(text);
      await fetch('http://localhost:8080/loadGame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      sessionStorage.setItem('player', 1);
      navigate('/actual-play');
    }
    reader.readAsText(file);
  }

  return (
    <div className="main-container">
      <img className="main-container-caption" src={SeaBattleImage} alt='Caption "Sea Battle"' />
      <div className='main-container-buttons'>
        <Button style={styles} onClick={handleOpenModal} value='Start' id='button0' />
        <Button style={styles} onClick={handleJoinSecondPlayer} value='Join as 2nd player' id='button2' />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <Settings onSubmit={submit} />
        </Modal >
        <input type='file' id='load-game' style={{ display: 'none' }} ref={fileInputRef} onChange={fileChanged} />
        <label htmlFor="load-game">
          <Button value='Load Game' id='button1' onClick={onLoadGame} />
        </label>
      </div>
      <img className="waves-picture" src={WavesImage} alt='Waves' />
    </div>
  )
}

export default Main