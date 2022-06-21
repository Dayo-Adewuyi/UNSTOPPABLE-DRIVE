import React from 'react'
import '../../styles/FileCard.css'
import ShareIcon from '@material-ui/icons/Share';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PublicIcon from '@material-ui/icons/Public';
import { ConnectContext } from '../../context/ConnectContext';
import { useContext, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const FileCard = ({ name, hash, id }) => {
    const { makePublic, shareFile } = useContext(ConnectContext);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [beneficiary, setBeneficiary] = useState("");
    const [beneficiaries, setBeneficiaries] = useState([]);
    const[string, setString] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = async() => {
        await makePublic(id);
    }
    const handleShare = async(id, beneficiaries, hash) => {
        
        await shareFile(id, beneficiaries, hash);

    }
    const handleChange = (e) => {
        setBeneficiary(e.target.value);
    }
    
    const addAddress = () =>{
        setBeneficiaries([...beneficiaries, beneficiary]);
        setBeneficiary("");
    }
    
    return (
        <div className='fileCard'>
            <div className="fileCard--top">
                <InsertDriveFileIcon style={{ fontsize: 180 }} />
            </div>

            <div className="fileCard--bottom">
                <p><a href={`https://ipfs.infura.io/ipfs/${hash}`} style={{textDecoration: 'none', color: 'black'}}>{name.slice(0,8)}</a></p> 
                <div><span><ShareIcon style ={{ fontsize: 10 } } onClick={() => handleOpen()}/></span><span><PublicIcon style ={{ fontSize: 15, cursor : 'pointer',  }} onClick={() => handleClick()} /></span></div>    
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
                <div style={modalStyle} className={classes.paper}>
                    <input type="text" placeholder="insert address of beneficiaries" name="address" onChange={handleChange}/>
                    <button onClick={()=>addAddress()} >Add Address</button><button onClick={()=>handleShare()} >Share</button>
                    </div>
            </Modal>
        </div>
    )
}

export default FileCard
