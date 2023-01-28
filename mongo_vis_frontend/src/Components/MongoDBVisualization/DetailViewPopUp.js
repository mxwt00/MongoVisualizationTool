import {useState} from "react";
import {Box, Button, Modal, Typography} from "@mui/material";

const DetailViewPopUp = (props) => {
    const {collectionTitle} = props

    const [isShown, setIsShown] = useState(false);

    const showDetailViewPopUp = () => {
        setIsShown(true)
    }

    const closeDetailViewPopUp = () => {
        setIsShown(false)
    }

    return (
        <div>
            <Button
                sx={{flex: '1 1 100%'}}
                variant="h6"
                id="tableTitle"
                component="div"
                onClick={showDetailViewPopUp}
            >
                {collectionTitle}
            </Button>
            <Modal open={isShown}
                   onClose={closeDetailViewPopUp}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
            >
                <Box sx={{width: 400 }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Hello World
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
export default DetailViewPopUp