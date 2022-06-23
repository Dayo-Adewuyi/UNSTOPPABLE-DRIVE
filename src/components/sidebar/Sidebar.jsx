import React,{useContext, useEffect, useState} from 'react'
import '../../styles/Sidebar.css'

import NewFile from './NewFile.jsx'
import SidebarItem from './SidebarItem.jsx'

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import PublicSharpIcon from '@material-ui/icons/PublicSharp';
import GavelSharpIcon from '@material-ui/icons/GavelSharp';
import { ConnectContext } from '../../context/ConnectContext'


const Sidebar = () => {


    const { checkModerator} = useContext(ConnectContext)


    const [currentAccount, setCurrentAccount] = useState("");
    const [isMod, setIsMod] = useState(false);
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
    }
    useEffect(() => {
      checkIfWalletIsConnected();
      if(currentAccount !== ""){
     const result = checkModerator(currentAccount)
     setIsMod(result)
     console.log(result)
      }
    },[checkModerator, currentAccount])
    return (
        <div className='sidebar'>
            <NewFile />

            <div className="sidebar__itemsContainer">
                <SidebarItem arrow icon={(<InsertDriveFileIcon />)} label={'My Files'} url={""}/>
                <SidebarItem arrow icon={(<PublicSharpIcon/>)} label={'Public Files'} url={"public-files"}/>
                <SidebarItem icon={(<PeopleAltIcon />)} label={'Shared with me'} url={"shared"} />
                <SidebarItem icon={(<QueryBuilderIcon />)} label={'Recent'} url={"recent"} />
                {(isMod===true) ? <SidebarItem icon={(<GavelSharpIcon />)} label={'Admins'} url={"admin"} /> :(<div></div>)}
                
               
                
                
                <hr/>
                
               

            </div>

        </div>
    )
}

export default Sidebar
