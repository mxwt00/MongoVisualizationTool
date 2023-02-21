import {useState} from "react";
import {Box, Button, Modal, Typography} from "@mui/material";
import DocumentTable from "./DocumentTable";
import {DocumentTableType} from "./DocumentTableType";

const DetailViewPopUp = (props) => {
    const {col} = props

    const [isShown, setIsShown] = useState(false);

    const showDetailViewPopUp = () => {
        setIsShown(true)
    }

    const closeDetailViewPopUp = () => {
        setIsShown(false)
    }

    function renderTables() {
        if (!col)
            return
        let tables = []
        for (let doc of col.documents) {
            tables.push(renderTable(doc))
        }
        return tables
    }

    function renderTable(doc) {
        return (
            <DocumentTable type={DocumentTableType.detail} doc={doc} docTitle={col.name}/>
        )
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Box sx={{textAlign: 'center'}}>
                <Button
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                    onClick={showDetailViewPopUp}
                >
                    {col.name}
                </Button>
            </Box>
            <Modal open={isShown}
                   onClose={closeDetailViewPopUp}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="outerDrawBoardContainerEr scrollAble">
                    <Typography id="modal-modal-title" variant="h5" component="h2" color="white">
                        {col.name}
                    </Typography>
                    <div className="spacerSmall"></div>
                    {renderTables()}
                </Box>
            </Modal>
        </div>
    )
}
export default DetailViewPopUp