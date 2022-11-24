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
          "inputs": [],
          "name": "decrement",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Decrement",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "increment",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Increment",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "count",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
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
