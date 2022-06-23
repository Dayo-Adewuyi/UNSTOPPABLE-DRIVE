import React, { useState, useEffect , useContext} from 'react'
import '../styles/FilesView.css'
// import{ toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import { ConnectContext } from '../context/ConnectContext'
import FileItem from '../components/filesView/FileItem'
import SharedCard from '../components/filesView/SharedCard'


export default function Shared() {

    const { getSharedFiles } = useContext(ConnectContext)
    const [files, setFiles] = useState([])
       
    const fetch = async() =>{
        const tx = await getSharedFiles()
             setFiles(tx)

     }
 
     useEffect(() => {fetch()}, [files])
    
    
    return (
        <div className='fileView'>
            <div className="fileView__row">
                {
                    files.map((element,index) => {
                        return(
                            <SharedCard key={index} address={element.sender} name={element.fileName} hash={element.shared_hash} type={element.fileType}/>
                        )})
                        
                } 
                {/* <button onClick={fetch}>Fetch</button> */}
            </div>
            {/* <div className="fileView__titles">
                <div className="fileView__titles--left">
                    <p>Name</p>
                </div>
                <div className="fileView__titles--right">
                    <p>Last modified</p>
                    <p>File size</p>
                </div>
            </div> */}
            {/* {
                files.map(({ id, item }) => (
                    <FileItem id={id} caption={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} />
                ))
            } */}
            
        </div>
    )

}