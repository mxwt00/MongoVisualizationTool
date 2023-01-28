import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper} from "@mui/material";
import {useSelector} from "react-redux";

const MongoDiagram = () => {
    let data = useSelector((state) => state.mongoContent.documents)

    function renderTables() {
        if (!data)
            return
        console.log("rendering tables")
        console.log(data)
        let tables = []
        for (let doc of data.payload.documents) {
            console.log(doc)
            tables.push(renderTable(doc))
        }
        return tables
    }

    function renderTable(doc) {
        return (
            <div>
                <TableContainer component={Paper} style={{display: 'inline-block', width: 500}}>
                    <Table size="small" aria-label="simple table">
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
            </div>
        )
    }

    return (
        <div className="outerDrawBoardContainerEr scrollAble">
            {renderTables()}
        </div>
    );
}
export default MongoDiagram;