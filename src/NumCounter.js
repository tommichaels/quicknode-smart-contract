import React, {useState} from 'react';
import {ethers} from 'ethers';
import SimpleStorage_abi from '../src/Contracts/SimpleStorage_abi.json';

const NumCounter = () => {
// const SimpleStorage = () => {

	// deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	// let provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
  
  let contractAddress = '0xB9187f9a9EB3d0Db336832ff70E1fE1F2e1F439d';

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
    // const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
    // const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545")
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
		setContract(tempContract);	
	}

	const setHandler = (event) => {
		event.preventDefault();
    
		contract.store(event.target.setText.value);
		console.log('sending ' + event.target.setText.value + ' to the contract');
	}

	const getCurrentVal = async () => {
		let val = await contract.retrieve();
		setCurrentContractVal(val);
	}

  return (

    
    <div className='form-content-right'>
       <button onClick= {connectWalletHandler} className='connect-btn'>
          {connButtonText}
        </button>
      <div className='form' >
        <h1>
          Address: {defaultAccount}
        </h1>
        <form onSubmit={setHandler} className='form-inputs'>
      
          <input
            className='form-input'
            id='setText'
            type='number'
            placeholder='Enter new contract number'
          />
          <button className='form-input-btn' type='submit'>
          Update Contract 
        </button>
        
        </form>
       
        
        <br></br>
        <button onClick= {getCurrentVal} className='form-input-btn' >
          View current contract value
        </button>
        <h1>
        current contract value:
        </h1>
        {currentContractVal}
        {errorMessage}
        {/* <button onClick= {getCount}  className='form-input-btn' type='submit' >
          getCount
        </button> */}
        
      </div>
    </div>
  );
};

export default NumCounter;
