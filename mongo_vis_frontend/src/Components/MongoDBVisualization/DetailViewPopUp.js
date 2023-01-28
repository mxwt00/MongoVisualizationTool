import {useState} from "react";
import {Box, Button, Modal, Typography} from "@mui/material";
import {useSelector} from "react-redux";

const DetailViewPopUp = (props) => {
    const {collectionTitle} = props

    const [isShown, setIsShown] = useState(false);
    let data = useSelector((state) => state.mongoContent.collections)

    const showDetailViewPopUp = () => {
        setIsShown(true)
    }

    const closeDetailViewPopUp = () => {
        setIsShown(false)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

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
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="white">
                        Hello World
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}
export default DetailViewPopUp