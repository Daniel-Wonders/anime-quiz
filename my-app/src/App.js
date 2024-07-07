import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Intro from './Components/Intro';
import React, { useState } from 'react';
import Trivia from './Components/Trivia';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [resetKey, setResetKey] = useState(0); 
  const [counter,setCounter]=React.useState(0)
  const [totalCounter,setTotalCounter]=React.useState(0)
  const [hasChrashed,setHasCrashed]=React.useState(false)
  const [dimmed,setDimmed]=React.useState(false)

  function handleStart() {
    setIsStarted(true);
  }

  function handleReset() {
    setIsStarted(false);
    setIsStarted(true);
    setResetKey(prevKey => prevKey + 1);
    setCounter(0)
    setTotalCounter(0)
    setHasCrashed(false)
    setDimmed(false)
  }

  function incrementCounter(){
    setCounter((oldCounter)=>oldCounter+=1)
  }

  function incrementTotalCounter(){
    setTotalCounter((oldCounter)=>oldCounter+=1)
  }

  function crashed(){
    setHasCrashed(true)
  }

  function closeModal(){
    setDimmed(false)
    document.getElementById("modal").style.display="none"
  }

  React.useEffect(() => {
    if (!dimmed && totalCounter === 5) {
      const scrollToOptions = {
        top: document.documentElement.scrollHeight || document.body.scrollHeight,
        behavior: 'smooth'
      };
      window.scrollTo(scrollToOptions);
    }
    
  }, [dimmed]);

  React.useEffect(() => {   
    if (totalCounter === 5) {
      setDimmed(true);
    }
  }, [totalCounter]);
  
  return (
    <main>
      <Header />

      {(totalCounter===5 && counter===5) ? 
        <div class="modal" id="modal">
          <div class="close-modal-btn-container">
            <button onClick={closeModal} 
              class="modal-close-btn" 
              id="modal-close-btn" >X</button>
          </div>
          <div className='modalContainer'>
            <p className='encourageMsg'>Great job!</p>
            <img className='meme' 
              src="https://i.pinimg.com/originals/7b/c6/51/7bc651b2eaecdee33700823fbcd017b8.gif"/>
          </div>
        </div>
      : totalCounter === 5 ? (
        <div className="modal" id="modal">
          <div className="close-modal-btn-container">
            <button onClick={closeModal}  
              className="modal-close-btn" 
              id="modal-close-btn">X</button>
          </div>
          <div className='modalContainer'>
            <p className='encourageMsg'>Better luck next time buddy...</p>
            <img className='meme' src="https://media3.giphy.com/media/ujZtlj1Y7wXyE/giphy.gif?cid=6c09b952bwe0rde9n63cihb6038wefq3uh54d7wa3ua71x08&ep=v1_gifs_search&rid=giphy.gif&ct=g"/>
          </div>
        </div>
      ) : null}
      
      
      {isStarted ? 
        <Trivia
          dimmed={dimmed}
          key={resetKey} 
          incrementCounter={incrementCounter}
          counter={counter}
          incrementTotalCounter={incrementTotalCounter}
          crashed={crashed}
          /> 

      : <Intro onStart={handleStart} />}
      
      {(isStarted && (totalCounter===5) && !(dimmed)) || hasChrashed ? (
        <button onClick={handleReset} id='retryBtn'>Try Again!</button>
      ) : null}

    </main>
  );
}

export default App;
