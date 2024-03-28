import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { MainButton, useShowPopup } from '@vkruglikov/react-telegram-web-app';

const Content = () => {
  const showPopup = useShowPopup();

  const handleClick = () =>
    showPopup({
      message: 'Hello, I am popup',
    });

  return <MainButton text="SHOW POPUP" onClick={handleClick} />;
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <Content />
  )
}

export default App
