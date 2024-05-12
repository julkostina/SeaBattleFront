import React from 'react'
import '../styles/Result.css'
import WavesImage from '../assets/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3BkbWlzYzNiYXRjaDItbG9jMjAwODY2MDQ3OGEtaW1hZ2VfMS5wbmc 1-Photoroom.png-Photoroom.png'
import WinnerIs from '../assets/Winner is.png'
import PartyFace from '../assets/Partying Face.png'
import PartyPopper from '../assets/Party Popper.png'
import Button from '../components/Button'

function Result() {
    const handlePlayAgain= ()=>{
        console.log("Play again");
    }
  return (
    <div className='result'>
        <div className='result-container'>
            <div className='result-container-upper'>
            <img src={WinnerIs} alt='winner is'/>
            <div id="winner-name">Player_1</div>
            </div>
            <div className="result-container-down">
                <img src={PartyPopper} alt='party popper emoji'/>
                <Button id="play-again" value="Play Again" onClick={()=>handlePlayAgain}/>
                <img src={PartyFace} alt='party face emoji'/>
            </div>
        </div>
        <img src={WavesImage} id="waves-image" alt='waves'/>
    </div>
  )
}

export default Result