import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper} from "@mui/material";
import {useSelector} from "react-redux";

const MongoDiagram = () => {
    let documents = useSelector((state) => state.mongoContent.documents)

    function renderTables() {
        if (!documents)
            return
        console.log("rendering tables")
        console.log(documents)
        let tables = []
        for (let doc of documents.payload.tables) {
            console.log(doc)
            tables.push(renderTable(doc))
        }
        return tables
    }

    function renderTable(doc) {
        return (
            <div>
                <TableContainer component={Paper} style={{display: 'inline-block'}}>
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                           align="left">Key</TableCell>
                                <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                           align="left">Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {doc.keys.map((key) => (
                                <TableRow
                                    key={key}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                               align="left">{key}</TableCell>
                                    <TableCell style={{width: 1, whiteSpace: 'nowrap'}}
                                               align="left">{"dummyType"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="spacerSmall"/>
            </div>
        )
    }

    return (
        <div style={{paddingLeft: 300, display: 'inline-block'}}>
            {renderTables()}
        </div>
    );
}
export default MongoDiagram;