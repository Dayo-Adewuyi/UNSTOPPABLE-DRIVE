import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../constants/OxPantry.json";
import { contractAddress } from "../constants/constants";

export const ConnectContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const oxPantryContract = new ethers.Contract(contractAddress, abi.abi, signer);
 
  return oxPantryContract;
};

const fetchPublic = async() => {
  const contract = createEthereumContract();
  
 try {
   const result =await contract.fetchPublicFiles();
  
  return result
  }
 catch(error){
   console.log(error)
 
 }
}

const fetchAll = async() => {
  const contract = createEthereumContract();
  
 try {
   const result =await contract.fetchUserFiles();
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}

const takeAction = async( fileid) => {
  const contract = createEthereumContract();
  
 try {

  await contract.makeReportedPrivate(fileid);
  

  }
 catch(error){
   console.log(error)
  
 }
}

const fetchPrivate = async() => {
  const contract = createEthereumContract();
  
 try {
   const  result =await contract.fetchUserFiles();
  
  return result
  }
 catch(error){
   console.log(error)
 
 }
}

const makePrivate = async(id) => {
  const contract = createEthereumContract();
  
 try {
   const  result =await contract.makeFilePrivate(id);
  
  return result
  }
 catch(error){
   console.log(error)
 
 }
}

const makePublic = async(id) => {
  const contract = createEthereumContract();
  
 try {
   const  result =await contract.makeFilePublic(id);
  
  return result
  }
 catch(error){
   console.log(error)
 
 }
}


const uploads = async(hash, size, type, name, description, isPublic) => {
  
  
  try {
   if (ethereum) {
     const transactionsContract = createEthereumContract();
    await transactionsContract.uploadFile(hash, size, type, name, description, isPublic,{
     gasPrice: 100,
     gasLimit: 1000000
 });}
   }
 
  catch(error){
    console.log(error)
   
  }
 }


 const makeMod = async(addr) => {
  const contract = createEthereumContract();
  
 try {
   const  result =await contract.assignMod(addr);
  
  return result
  }
 catch(error){
   console.log(error)
 
 }
}


const remMod = async(addr) => {
  const contract = createEthereumContract();
  
 try {
   const  result =await contract.removeMod(addr);
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}

const reportFile = async(id) => {
  const contract = createEthereumContract();
  
 try {
   const  result =await contract.report(id);
  
  return result
  }
 catch(error){
   console.log(error)

 }
}

const reportedList = async() => {
  const contract = createEthereumContract();
  
 try {
   const  result =await contract.reportedListArray();
  //console.log(result)
  return result
  }
 catch(error){
   console.log(error)
  
 }
}



const checkModerator = async(addr) => {
  const contract = createEthereumContract();
  
 try {
   const result = await contract.checkMod(addr);
  return result
  }
 catch(error){
   console.log(error)
  
 }
}

const add2Blacklist = async(addr) => {
  const contract = createEthereumContract();
  
 try {
   const result = await contract.addToBlackList(addr);
  console.log(result)
  return result
  }
 catch(error){
   console.log(error)
 
 }
}

const remFrmBlacklist = async(addr) => {
  const contract = createEthereumContract();
  
 try {
   const result = await contract.removeFromBlackList(addr);
  console.log(result)
  return result
  }
 catch(error){
   console.log(error)
 
 }
}

const blackList = async() => {
  const contract = createEthereumContract();
  
 try {
   const  result =await contract.blackListArray();
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}

const pauseContract = async() => {
  const contract = createEthereumContract();
  
 try {
   const  result =await contract.pause();
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}

const unPauseContract = async() => {
  const contract = createEthereumContract();
  
 try {
   const  result =await contract.unpause();
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}

const shareFile = async(id, beneficiaries) => {
    const contract = createEthereumContract();
    
   try {
     const  result =await contract.shareFile(id, beneficiaries);
    
    return result
    }
   catch(error){
     console.log(error)
   
   }
  }

const getSharedFiles = async() => {
    const contract = createEthereumContract();
    try {
        const  result =await contract.getSharedFiles();
       
       return result
       }
      catch(error){
        console.log(error)
      
      }
    }
export const ConnectProvider = ({ children }) =>{
    const [currentAccount, setCurrentAccount] = useState("");

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
    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;
    
        if (!ethereum) {
          console.log('Make sure you have metamask!');
          return;
        } else {
          console.log('We have the ethereum object', ethereum);
        }
    
        // Check if we're authorized to access the user's wallet
        const accounts = await ethereum.request({ method: 'eth_accounts' });
    
        // Users can have multiple authorized accounts, we grab the first one if its there!
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      };


      useEffect(() => {
        checkIfWalletIsConnected();
      }, [])
    
  
    

    
    return (
      <ConnectContext.Provider
        value={{
          checkModerator,
          pauseContract,
          unPauseContract,
          remFrmBlacklist,
          currentAccount,
          connectWallet,
          add2Blacklist,
          fetchPrivate,
          reportedList,
          fetchPublic,
          makePrivate,
          makePublic,
          takeAction,
          reportFile,
          blackList,
          fetchAll,
          uploads,
          makeMod,
          remMod,
          shareFile,
          getSharedFiles
        }}
      >
        {children}
      </ConnectContext.Provider>
    );
  };