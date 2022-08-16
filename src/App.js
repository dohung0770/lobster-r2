import React, { useRef } from 'react';
import { BrowserRouter } from 'react-router-dom'
import ClinicalNote from './components/clinicalNote';
import './App.scss';

function App() {
  const containerRef = useRef(null)

  return (
    <BrowserRouter>
      <div className="container" ref={containerRef}>
        <ClinicalNote container={containerRef} />
      </div>
    </BrowserRouter>
  )
}

export default App
