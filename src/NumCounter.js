// import React from 'react';
// import './Form.css';
// import { ethers } from 'ethers';

// const NumCounter = () => {

//   window.ethereum.enable();

//   // var provider = new ethers.providers.Web3Provider(
//   //   web3.currentProvider,
//   //   "ropsten"
//   // );
  
//   const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
  
//   const CounterContractAddress = "0xB14BcD541BD36B02858e780982a907b50Aa75Cdf";

//       const CounterContractABI = [
//         {
//           "inputs": [],
//           "name": "decrement",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//         },
//         {
//           "anonymous": false,
//           "inputs": [
//             {
//               "indexed": false,
//               "internalType": "uint256",
//               "name": "value",
//               "type": "uint256"
//             }
//           ],
//           "name": "Decrement",
//           "type": "event"
//         },
//         {
//           "inputs": [],
//           "name": "increment",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//         },
//         {
//           "anonymous": false,
//           "inputs": [
//             {
//               "indexed": false,
//               "internalType": "uint256",
//               "name": "value",
//               "type": "uint256"
//             }
//           ],
//           "name": "Increment",
//           "type": "event"
//         },
//         {
//           "inputs": [],
//           "name": "count",
//           "outputs": [
//             {
//               "internalType": "uint256",
//               "name": "",
//               "type": "uint256"
//             }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//         },
//         {
//           "inputs": [],
//           "name": "getCount",
//           "outputs": [
//             {
//               "internalType": "uint256",
//               "name": "",
//               "type": "uint256"
//             }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//         }
//       ];
//   let CounterContract;
//   let signer;
//   provider.send("eth_requestAccounts", []).then(() => {
//   provider.listAccounts().then((accounts) => {
//     signer = provider.getSigner(accounts[0]);
//     CounterContract = new ethers.Contract(
//       CounterContractAddress,
//       CounterContractABI,
//       signer
//     );
//   });
// });

// // async function getCount() {
// //   const getCounterPromise = CounterContract.getCount();
// //   const Counter = await getCounterPromise;
// //   console.log(Counter);
// // }


// const getCount = async () => {
//   const getCounterPromise = new getCounterPromise((resolve, reject) => {
//     setTimeout(() => resolve("I am a done promise!"), 3000)
// });

// const Counter = await getCounterPromise;

// console.log(Counter);
// }

// // async function setCount() {
// //   // const Counter = document.getElementById("counter").value;
// //   const setCounterPromise = CounterContract.setCount();
// //   await setCounterPromise;
// // }

// const setCount = async () => {
//   const setCounterPromise = new setCounterPromise((resolve, reject) => {
//     setTimeout(() => resolve("I am a done promise!"), 3000)
// });
// const Counter = await setCounterPromise;

// alert(Counter);
// }

// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import React, {useState} from 'react';
import {ethers} from 'ethers';
import SimpleStorage_abi from '../src/Contracts/SimpleStorage_abi.json';

const NumCounter = () => {
// const SimpleStorage = () => {

	// deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	let contractAddress = '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

  const onClickTest = () => {
    console.log('You just clicked me');
  }

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
		setContract(tempContract);	
	}

	const setHandler = (event) => {
		event.preventDefault();
		console.log('sending ' + event.target.setText.value + ' to the contract');
		contract.set(event.target.setText.value);
	}

	const getCurrentVal = async () => {
		let val = await contract.get();
		setCurrentContractVal(val);
	}

  return (

    
    <div className='form-content-right'>
       <button onClick= {connectWalletHandler} className='connect-btn' type='submit'>
          Connect
        </button>
      <div className='form' noValidate>
        <h1>
          Address:
        </h1>
        <div className='form-inputs'>
          <input
            className='form-input'
            type='name'
            name='name'
            placeholder='Enter new contract value'
          />
        </div>
       
        <button className='form-input-btn' type='submit'>
          Update Contract 
        </button>
        <br></br>
        <button onClick= {onClickTest} className='form-input-btn' type='submit' >
          View current contract value
        </button>
        <h1>
        current contract value:
        </h1>
        {/* <button onClick= {getCount}  className='form-input-btn' type='submit' >
          getCount
        </button> */}
        
      </div>
    </div>
  );
};

export default NumCounter;
