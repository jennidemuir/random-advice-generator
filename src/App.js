import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./App.css"
import Modal from './Modal';

console.log(process.env.REACT_APP_API_KEY);

function App() {
    const [showModal, setShowModal] = useState(false);
    const [advice, setAdvice] = useState("");


    useEffect(() => {
      const url = ("https://api.adviceslip.com/advice");
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setAdvice(json.slip.advice);


        }catch(error){
          console.log("error", error);
        }
      }
      fetchData()
    }, [])

    const openModal = () => {
      setShowModal((prev) => !prev);
    };



  return (
    <div className="App">
      <nav>Random Advice Generator</nav>
      <button className="open-modal" onClick={openModal}>
        Get Advice
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal} setAdvice={setAdvice}>
        <p>
            {advice}
        </p>
      </Modal>
    </div>
  );
}

export default App;
