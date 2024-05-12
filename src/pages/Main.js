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
    navigate('/play');
  };

  return (
    <div className="main-container">
        <img className="main-container-caption"src={SeaBattleImage} alt='Caption "Sea Battle"'/>
        <div className='main-container-buttons'>
        <Button style={styles} onClick={handleOpenModal} value='Start' id='button0'/>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Settings/>
      </Modal >
        <Button value='Load Game' id='button1'/>
        </div>
        <img className="waves-picture"src={WavesImage} alt='Waves'/>
    </div>
  )
}

export default Main