import {useSelector} from "react-redux";
import DocumentTable from "./DocumentTable";

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

    function renderTable(col) {
        let doc = col.documents[0]
        return (
            <DocumentTable doc={doc} title={col.name}/>
        )
    }

    return (
        <div className="outerDrawBoardContainerEr scrollAble">
            {renderTables()}
        </div>
    );
}
export default MongoDiagram;