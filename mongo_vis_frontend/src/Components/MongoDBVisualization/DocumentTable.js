import {
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography
} from "@mui/material";
import DetailViewPopUp from "./DetailViewPopUp";
import {DocumentTableType} from "./DocumentTableType";
import {Fragment, useState} from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DocumentTable = (props) => {
    const {type, doc, col} = props

    function EnhancedTableToolbar() {
        switch (type) {
            case DocumentTableType.main:
                return (
                    <Toolbar style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                        <DetailViewPopUp col={col}/>
                    </Toolbar>
                )
            case DocumentTableType.detail:
                let countText
                if (doc.count === 1)
                    countText = "1 document is using this schema"
                else
                    countText = doc.count + " documents are using this schema"


                return (
                    <Toolbar>
                        <Typography
                            sx={{flex: '1 1 100%'}}
                            variant="body2"
                            id="subtext"
                        >
                            {countText}
                        </Typography>
                    </Toolbar>
                )
            default:
                return (<div/>)
        }
    }

    function Body() {
        let values
        if (type === DocumentTableType.nested)
            values = doc
        else
            values = doc.values

        return (
            <TableBody>
                {values.map((value) => (
                    <Row value={value}/>
                ))}
            </TableBody>
        )
    }

    function Row(props) {
        const [open, setOpen] = useState(false)
        const {value} = props


        return (
            <Fragment>
                <TableRow
                    key={value.key}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <ExpandButton value={value} open={open} setOpen={setOpen}/>
                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                               align="left">{value.key}</TableCell>
                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                               align="left">{value.type}</TableCell>
                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                               align="left">{value.ref}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <DocumentTable type={DocumentTableType.nested} doc={value.nested_document}/>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        )
    }

    function ExpandButton(props) {
        const {value, open, setOpen} = props
        if (value.nested_document != null) {
            return (
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                </IconButton>
            )
        } else {
            return (<TableCell/>)
        }
    }

    const style = {
        display: 'inline-block',
        width: '50%'
    }

    return (
        <div>
            <Paper>
                <EnhancedTableToolbar/>
                <TableContainer style={style}>
                    <Table size="small"
                           aria-labelledby="document_table"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                           align="left">Key</TableCell>
                                <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                           align="left">Type</TableCell>
                                <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                           align="left">Reference</TableCell>
                            </TableRow>
                        </TableHead>
                        <Body/>
                    </Table>
                </TableContainer>
                <div className="spacerSmall"/>
            </Paper>
        </div>
    )
}
export default DocumentTable