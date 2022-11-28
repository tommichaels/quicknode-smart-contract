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
  
  const CounterContractAddress = "0xB14BcD541BD36B02858e780982a907b50Aa75Cdf";

      const CounterContractABI = [
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
  let CounterContract;
  let signer;
  provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    CounterContract = new ethers.Contract(
      CounterContractAddress,
      CounterContractABI,
      signer
    );
  });
});

// async function getCount() {
//   const getCounterPromise = CounterContract.getCount();
//   const Counter = await getCounterPromise;
//   console.log(Counter);
// }


const getCount = async () => {
  const getCounterPromise = new getCounterPromise((resolve, reject) => {
    setTimeout(() => resolve("I am a done promise!"), 3000)
});
const Counter = await getCounterPromise;

console.log(Counter);
}

// async function setCount() {
//   // const Counter = document.getElementById("counter").value;
//   const setCounterPromise = CounterContract.setCount();
//   await setCounterPromise;
// }

const setCount = async () => {
  const setCounterPromise = new setCounterPromise((resolve, reject) => {
    setTimeout(() => resolve("I am a done promise!"), 3000)
});
const Counter = await setCounterPromise;

alert(Counter);
}

  return (

    
    <div className='form-content-right'>
       <button className='connect-btn' type='submit'>
          Connect
        </button>
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
          Decrement
        </button>
        <br></br>
        <button onClick= {setCount} className='form-input-btn' type='submit' >
          Count
        </button>
        <button onClick= {getCount}  className='form-input-btn' type='submit' >
          getCount
        </button>
      </div>
    </div>
  );
};

export default NumCounter;
