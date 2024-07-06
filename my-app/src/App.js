import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Intro from './Components/Intro';
import React from 'react';
import Trivia from './Components/Trivia';

function App() {

  const[isStarted,setIsStarted]=React.useState(false)

  function handleStart(){
    setIsStarted(true)
  }

  return (
    <main>
      <Header/>
      
      {isStarted ? <Trivia/>: <Intro onStart={handleStart}/>}
    </main>
  );
}

export default App;
