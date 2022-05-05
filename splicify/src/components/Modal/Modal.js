import '../Modal/Modal.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';

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

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                {/* <button type="button" onClick={handleClose}>
                Close
                </button> */}
            </section>
        </div>
    );
};

export default Modal;