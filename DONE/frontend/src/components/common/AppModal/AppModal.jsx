import Modal from '@mui/material/Modal'
import './style.css'

const AppModal = (props) => {
    const { children, close, open, popupModal = false } = props
    return (
        <Modal
            sx={{ display: { md: 'flex', xs: 'flex' } }}
            className={popupModal ? 'popup-modal' : ''}
            open={open}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {children}
        </Modal>
    )
}

export default AppModal