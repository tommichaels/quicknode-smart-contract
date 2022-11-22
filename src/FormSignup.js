import React from 'react';
import './Form.css';

const FormSignup = () => {


  return (
    <div className='form-content-right'>
      <form className='form' noValidate>
        <h1>
          Numeric Counter
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
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
      </form>
    </div>
  );
};

export default FormSignup;
