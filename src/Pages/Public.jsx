import React, { useState, useEffect , useContext} from 'react'
import '../styles/FilesView.css'

import { ConnectContext } from '../context/ConnectContext'

import PublicCard from '../components/filesView/PublicCard'


export default function Example() {

    const { fetchAll, shareFile, makePublic } = useContext(ConnectContext)
    const [files, setFiles] = useState([])
    
    

    
    const fetch = async() =>{
        const tx = await fetchPublic()
             setFiles(tx)

     }
 
     useEffect(() => {fetch()}, [files])
    
     console.log(files)
    return (
        <div className='fileView'>
            <div className="fileView__row">
                {
                    files.map((element,index) => {
                        return(
                            <PublicCard key={index} id={element.fileId} name={element.fileName} hash={element.fileHash} type={element.fileType}/>
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