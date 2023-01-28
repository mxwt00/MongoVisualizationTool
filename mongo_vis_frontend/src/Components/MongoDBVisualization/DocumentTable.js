import {
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

const DocumentTable = (props) => {
    const {type, doc, col} = props

    function EnhancedTableToolbar() {
        if (type === DocumentTableType.main) {
            return (
                <Toolbar style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                    <DetailViewPopUp col={col}/>
                </Toolbar>
            )
        } else {
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
                                <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                           align="left">Key</TableCell>
                                <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                           align="left">Type</TableCell>
                                <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                           align="left">Reference</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {doc.values.map((value) => (
                                <TableRow
                                    key={value.key}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                               align="left">{value.key}</TableCell>
                                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                               align="left">{value.type}</TableCell>
                                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                               align="left">{value.ref}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="spacerSmall"/>
            </Paper>
        </div>
    )
}
export default DocumentTable