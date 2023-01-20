import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper} from "@mui/material";

const MongoDiagram = () => {
    function createData(
        key, type
    ) {
        return {key, type};
    }

    const rows = [
        createData("manufacturer", "String"),
        createData("model", "String"),
        createData("model", "String"),
        createData("ps", "Integer"),
        createData("fuel type", "String")
    ];

    return (
        <div>
            <TableContainer component={Paper}>
                <Table size = "small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{width: '1px', whiteSpace: 'nowrap'}}
                                       align="left">Key</TableCell>
                            <TableCell style={{width: '1px', whiteSpace: 'nowrap'}}
                                       align="left">Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell style={{width: '1px', whiteSpace: 'nowrap'}}
                                           align="left">{row.key}</TableCell>
                                <TableCell style={{width: '1px', whiteSpace: 'nowrap'}}
                                           align="left">{row.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default MongoDiagram;