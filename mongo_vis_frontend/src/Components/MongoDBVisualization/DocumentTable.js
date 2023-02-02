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
    const {type: tableType, doc, col} = props

    function EnhancedTableToolbar() {
        switch (tableType) {
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
        if (tableType === DocumentTableType.nested || tableType === DocumentTableType.array)
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
                    sx={{'& > *': {borderBottom: 'unset'}}}
                >
                    <ExpandButton value={value} open={open} setOpen={setOpen}/>
                    <MainRow value={value}/>
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={4}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <NestedOrArrayTable value={value}/>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Fragment>
        )
    }

    function MainRow(props) {
        const {value} = props
        if (tableType === DocumentTableType.array) {
            return (
                <Fragment>
                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                               align="left">{value.type}</TableCell>
                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                               align="left">{value.ref}</TableCell>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                               align="left">{value.key}</TableCell>
                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                               align="left">{value.type}</TableCell>
                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                               align="left">{value.ref}</TableCell>
                </Fragment>
            )
        }

    }

    function NestedOrArrayTable(props) {
        const {value} = props
        if (value.type === "Array") {
            return (
                <DocumentTable
                    type={DocumentTableType.array}
                    doc={value.array_values}
                />
            )
        }
        if (value.type === "Embedded document") {
            return (
                <DocumentTable
                    type={DocumentTableType.nested}
                    doc={value.nested_document}
                />
            )
        }
    }

    function ExpandButton(props) {
        const {value, open, setOpen} = props
        if (value.type === "Embedded document" || value.type === "Array") {
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

    function style() {
        if (tableType === DocumentTableType.nested) {

            return {
                display: 'inline-block',
                width: '100%'
            }
        } else {
            return {
                display: 'inline-block',
                width: '620px'
            }
        }
    }

    function RenderTableHead() {
        if (tableType === DocumentTableType.array) {
            return (
                <TableHead>
                    <TableRow>
                        <TableCell width='20px' align='right'/>
                        <TableCell width='200px' align="left">Type</TableCell>
                        <TableCell width='200px' align="left">Reference</TableCell>
                    </TableRow>
                </TableHead>
            )
        } else {
            return (
                <TableHead>
                    <TableRow>
                        <TableCell width='20px' align='right'/>
                        <TableCell width='200px' align="left">Key</TableCell>
                        <TableCell width='200px' align="left">Type</TableCell>
                        <TableCell width='200px' align="left">Reference</TableCell>
                    </TableRow>
                </TableHead>
            )
        }
    }

    return (
        <div>
            <Paper>
                <EnhancedTableToolbar/>
                <TableContainer style={style()}>
                    <Table size="small"
                           aria-labelledby="document_table"
                    >
                        <RenderTableHead/>
                        <Body/>
                    </Table>
                </TableContainer>
                <div className="spacerSmall"/>
            </Paper>
        </div>
    )
}
export default DocumentTable