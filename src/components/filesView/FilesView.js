import React, { useState, useEffect, useContext } from 'react'
import '../../styles/FilesView.css'
import { ConnectContext } from '../../context/ConnectContext'

import FileItem from './FileItem'
import FileCard from './FileCard'



const FilesView = () => {
    const {fetchPrivate} = useContext(ConnectContext);
    const [files, setFiles] = useState([])

    // const fetch = async() => {
    //     await fetchPrivate();
    const fetch = async() => {
        let result = await fetchPrivate();
       setFiles(result)
    
    }
    // }
   useEffect(() => {

   fetch()
   
   
  
  
   },[fetchPrivate])

useEffect(() => {console.log(files)},[files])

    
    

    return (
        <div className='fileView'>
            {console.log(files)}
            <div className="fileView__row">
                 {
            
                    files.slice(0, 5).map((item,index) => (
                        <FileCard name={item.fileName} hash={item.fileHash} id={item.fileId} />
                    ))

                } 
            </div>
            <div className="fileView__titles">
                <div className="fileView__titles--left">
                    <p>Name</p>
                </div>
                <div className="fileView__titles--right">
                    <p>Last modified</p>
                    <p>File size</p>
                </div>
            </div>
         
            {files.map((item, index) => (
                    <FileItem id={(item.fileId).toNumber()} caption={item.fileName} timestamp={(item.uploadTime).toNumber()} fileUrl={item.fileHash} size={item.fileSize} />
                    
                    ))
            
             
                   
                
            }
        </div>
    )
}

export default FilesView
