import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar} from "@mui/material";
import DetailViewPopUp from "./DetailViewPopUp";

const DocumentTable = (props) => {
    const {doc, title} = props

    function EnhancedTableToolbar() {
        return (
            <Toolbar>
                <DetailViewPopUp collectionTitle={title}/>
            </Toolbar>
        )
    }

    return (
        <div>
            <Paper>
                <EnhancedTableToolbar title={title}/>
                <TableContainer style={{display: 'inline-block', width: 500}}>
                    <Table size="small"
                           aria-labelledby={title}
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