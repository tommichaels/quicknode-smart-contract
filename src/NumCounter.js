import React from 'react';
import './Form.css';
import { ethers } from 'ethers';

const NumCounter = () => {

  window.ethereum.enable();

  // var provider = new ethers.providers.Web3Provider(
  //   web3.currentProvider,
  //   "ropsten"
  // );
  
  const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
  
  const MoodContractAddress = "0xB14BcD541BD36B02858e780982a907b50Aa75Cdf";

      const MoodContractABI = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_mood",
            "type": "string"
          }
        ],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getMood",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
  let MoodContract;
  let signer;
  provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(
      MoodContractAddress,
      MoodContractABI,
      signer
    );
  });
});
async function getCount() {
  const getMoodPromise = MoodContract.getMood();
  const Mood = await getMoodPromise;
  console.log(Mood);
}
async function setCount() {
  const mood = document.getElementById("mood").value;
  const setMoodPromise = MoodContract.setMood(mood);
  await setMoodPromise;
}
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
        <button className='form-input-btn' type='submit' onclick= {setCount()}>
          Count
        </button>
        <button  className='form-input-btn' type='submit' onclick= {getCount()}>
          getCount
        </button>
      </div>
    </div>
  );
};

export default NumCounter;
