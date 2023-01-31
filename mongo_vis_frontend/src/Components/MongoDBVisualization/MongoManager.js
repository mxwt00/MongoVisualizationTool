import MongoLeftSideBar from "./MongoLeftSideBar";
import MongoDiagram from "./MongoDiagram";

const MongoManager = () => {

    return (
        <div style={{textAlign: "center"}}>
            <div className="canvasStyle" id="canvas">
                <MongoLeftSideBar/>
                <MongoDiagram/>
            </div>
        </div>
    );
};
export default MongoManager;
