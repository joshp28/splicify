import './Introduction.css';
import spliced from '../../images/splicify.svg';
import go from '../../images/go.svg';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import {withRouter} from 'react-router-dom';

import { Link } from 'react-router-dom';
import {NavLink} from "react-router-dom";


const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function Introduction() {


    const [showIntro, setShowIntro] = useState(true);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function nextPath(path) {
        this.props.history.push(path);
    }

    

    return (
        <div id = "wrapper">
            <header className="Home">
                {/* <Button onClick={handleOpen}>Share</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Share this with friends!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Lorem ipsum...
                    </Typography>
                    
                </Box>
                </Modal> */}
                
                {/* <img src={btn} className="btn"  onClick={() => setShowIntro(!showIntro)} /> */}

                
                                
            </header>
            <div id="vl"></div>
            <div id='top'>
                <h1 id = 'title'>{"SPLICIFY"}</h1>
                <div id = 'labels'>
                    
                </div>
            </div>


            <div id='middle'>
                <hr id='top-line'></hr>
                <div id='blurb'>
                     <h3 >{"Can you get all top 5 songs of songs correct? Let???s see if you can figure out what songs are on your Splicify. Share with your friends and see if they can guess them right too."}</h3>
                </div>

                <img src={spliced} id="Home-logo" alt="spliced" />
            </div>

            <div id='bottom'>
                <hr id='bottom-line'></hr>
                <Button component={Link} to="/guesser/">
                    <img src = {go} id = "go"/>
                </Button>
            </div>

            
        </div>

        

    )
}



export default Introduction;
// export default withRouter(Introduction);