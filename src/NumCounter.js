import React from 'react';
import './Form.css';

const NumCounter = () => {


  return (
    <div className='form-content-right'>
      <div className='form' noValidate>
        <h1>
          Numeric Counter
        </h1>
        <div className='form-inputs'>
          <input
            className='form-input'
            type='number'
            name='username'
            placeholder='Enter your number'
          />
        </div>
        <button className='form-input-btn' type='submit'>
          Increment
        </button>
        <button className='form-input-btn' type='submit'>
          Decrement
        </button>
        <br></br>
        <button className='form-input-btn' type='submit'>
          Count
        </button>
        <button className='form-input-btn' type='submit'>
          getCount
        </button>
      </div>
    </div>
  );
};

export default NumCounter;
