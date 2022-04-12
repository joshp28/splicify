import './Introduction.css';
import spliced from '../../images/Cube.png';
import btn from '../../images/Enter_btn.png';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

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

    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
        }
    ];

    return (
        <div>
            <header className="Home">
                <Button onClick={handleOpen}>Share</Button>
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

                    <Autocomplete
                        id="highlights-demo"
                        sx={{ width: 300 }}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                            <TextField {...params} label="Guess your song!" margin="normal" />
                        )}
                        renderOption={(props, option, { inputValue }) => {
                            const matches = match(option.title, inputValue);
                            const parts = parse(option.title, matches);

                            return (
                            <li {...props}>
                                <div>
                                {parts.map((part, index) => (
                                    <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                    }}
                                    >
                                    {part.text}
                                    </span>
                                ))}
                                </div>
                            </li>
                            );
                        }}
                    />
                </Box>
                </Modal>
                
                <h2>{"Welcome to"}</h2>
                <h1>{"Splicify"}</h1>
                <img src={spliced} className="Home-logo" alt="spliced" />
                {showIntro &&
                    <div>
                        <h3>{"Your top 5 albums will be spliced onto this cube."}</h3>
                        <h3>{"Try to guess your top albums and see if your friends can guess them right!"}</h3>
                    </div>
                }
                {!showIntro &&

                    <h3>{"Creating your Splicify Now ..."}</h3>                    

                }   
                <img src={btn} className="btn"  onClick={() => setShowIntro(!showIntro)} />
                
                
            </header>

            
        </div>

        

    )
}

export default Introduction;