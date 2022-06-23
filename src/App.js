import React, {useEffect, useState, useContext} from "react";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Admin from "./Pages/Admin";
import Shared from "./Pages/Shared"
import Public from "./Pages/Public"
import Layout from "./components/Layout"
import FilesView from './components/filesView/FilesView'
import { ConnectProvider } from './context/ConnectContext';


import GitHubIcon from '@material-ui/icons/GitHub';
import { networks } from './utils/networks';


import './App.css';

export default function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [network, setNetwork] = useState('');
    const connectWallet = async () => {
        try {
          const { ethereum } = window;
    
          if (!ethereum) {
            alert("Get MetaMask -> https://metamask.io/");
            return;
          }
                
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
          
          console.log("Connected", accounts[0]);
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.log(error)
        }
      }
      const switchNetwork = async () => {
        if (window.ethereum) {
          try {
            // Try to switch to the Mumbai testnet
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
            });
          } catch (error) {
            // This error code means that the chain we want has not been added to MetaMask
            // In this case we ask the user to add it to their MetaMask
            if (error.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {	
                      chainId: '0x13881',
                      chainName: 'Polygon Mumbai Testnet',
                      rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                      nativeCurrency: {
                          name: "Mumbai Matic",
                          symbol: "MATIC",
                          decimals: 18
                      },
                      blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                    },
                  ],
                });
              } catch (error) {
                console.log(error);
              }
            }
            console.log(error);
          }
        } else {
          // If window.ethereum is not found then MetaMask is not installed
          alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
        } 
      }
      const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;
    
        if (!ethereum) {
          console.log('Make sure you have metamask!');
          return;
        } else {
          console.log('We have the ethereum object', ethereum);
        }
        
        const accounts = await ethereum.request({ method: 'eth_accounts' });
    
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
        
        // This is the new part, we check the user's network chain ID
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setNetwork(networks[chainId]);
    
        ethereum.on('chainChanged', handleChainChanged);
        
        // Reload the page when they change networks
        function handleChainChanged(_chainId) {
          window.location.reload();
        }
      };


      useEffect(() => {
        checkIfWalletIsConnected();
      }, [])

      useEffect(() => {
        if (network === 'Polygon Mumbai Testnet') {
          renderInputForm();
        }
      }, [currentAccount, network]);
    
   const renderInputForm = () =>{
		if (network !== 'Polygon Mumbai Testnet') {
			return (
				<div className="error">
					<p>Please connect to Polygon Mumbai Testnet</p>
				</div>
			)}else{
        return(
          <Router>
          
           <Layout>
            <Routes> 
            
              
                
               
          <Route exact path="/" element={<FilesView />}></Route>
                <Route exact path="/admin" element={<Admin />}></Route>
      
                <Route exact path="/shared" element={<Shared />}></Route>
                <Route exact path="/public-files" element={<Public />}></Route>
                
              
            
              </Routes>
              </Layout>
              
          </Router>
         
        )
      };
		}


  
  
  return (
    <ConnectProvider>
    {
        currentAccount ? (
          <>
            {renderInputForm()}
          </>
        ) : (<div className="container">
        <div className="header-container">
        <header>
          <div className="left">
            <p className="title"><span role="img" aria-label="sheep">🗄️</span> OxPantry</p>
            <p className="subtitle">Store and share your files 😀!</p>
                        </div>

          <div className="right">
    
  </div>
        </header>
      </div>
        <div className="connect-wallet-container">
        <img src="https://media.giphy.com/media/kIQRoRorbJ5AIk6joX/giphy.gif" alt="greatness" />
       
        <button onClick={connectWallet} className="cta-button connect-wallet-button">
          Connect Wallet
        </button>
      </div>
      <div className="footer-container">
        <GitHubIcon className="twitter-logo" />
        <a
          className="footer-text"
          href= "https://github.com/Dayo-Adewuyi"
          target="_blank"
          rel="noreferrer"
        >{`built by Hamid`}</a>
      </div>
      </div>)}
    </ConnectProvider>
  );
  
}
