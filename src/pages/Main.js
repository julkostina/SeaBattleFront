import React from 'react'
import styles from '../styles/Main.css'
import Button from '../components/Button'
import SeaBattleImage from '../assets/Sea Battle.png'
import WavesImage from '../assets/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3BkbWlzYzNiYXRjaDItbG9jMjAwODY2MDQ3OGEtaW1hZ2VfMS5wbmc 1-Photoroom.png-Photoroom.png'
import Modal from '../components/Modal'
import Settings from '../components/Settings'
import { useNavigate } from 'react-router-dom';


function Main() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const submit = async (form) => {
    setIsModalOpen(false);
    await fetch('http://localhost:8080/initGame', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    navigate('/choose-placement');
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
      navigate('/choose-placement');
    }
    reader.readAsText(file);
  }

  return (
    <div className="main-container">
      <img className="main-container-caption" src={SeaBattleImage} alt='Caption "Sea Battle"' />
      <div className='main-container-buttons'>
        <Button style={styles} onClick={handleOpenModal} value='Start' id='button0' />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <Settings onSubmit={submit} />
        </Modal >
        <label htmlFor="load-game">
          <Button value='Load Game' id='button1' />
        </label>
        <input type='file' id='load-game' onChange={fileChanged} />
      </div>
      <img className="waves-picture" src={WavesImage} alt='Waves' />
    </div>
  )
}

export default Main