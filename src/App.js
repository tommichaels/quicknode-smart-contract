import React from 'react';
import './Form.css';
// import FormSignup from './NumCounter';

import NumCounter from './NumCounter';

const App = () => {

  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
          <img className='form-img' src='/img/img-2.svg' alt='spaceship' />
        </div>
        <NumCounter />
      </div>
    </>
  );
};

export default App;
