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
import {useSelector} from "react-redux";

const TableTitle = (text) => (
    <Typography
        sx={{flex: '1 1 100%'}}
        variant="h6"
        id="tableTitle"
        component="div"
    >
        {text}
    </Typography>
)

const MongoDiagram = () => {
    let data = useSelector((state) => state.mongoContent.collections)

    function renderTables() {
        if (!data)
            return
        console.log("rendering tables")
        console.log(data)
        let tables = []
        for (let col of data.payload.collections) {
            tables.push(renderTable(col))
        }
        return tables
    }

    function EnhancedTableToolbar(props) {
        const {title} = props
        return (
            <Toolbar>
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {title}
                </Typography>
            </Toolbar>
        )
    }


    function renderTable(col) {
        let doc = col.documents[0]
        return (
            <div>
                <Paper>
                    <EnhancedTableToolbar title={col.name}/>
                    <TableContainer style={{display: 'inline-block', width: 500}}>
                        <Table size="small"
                               aria-labelledby={col.name}
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

    return (
        <div className="outerDrawBoardContainerEr scrollAble">
            {renderTables()}
        </div>
    );
}
export default MongoDiagram;