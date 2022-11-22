import React from 'react';
import './Form.css';
import FormSignup from './NumCounter';

const App = () => {
  return (
    <>
      <div className='form-container'>
        <span className='close-btn'>×</span>
        <div className='form-content-left'>
          <img className='form-img' src='/img/img-2.svg' alt='spaceship' />
        </div>
        <FormSignup/>
      </div>
    </>
  );
};

export default App;
