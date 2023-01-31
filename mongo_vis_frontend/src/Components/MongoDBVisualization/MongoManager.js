import MongoLeftSideBar from "./MongoLeftSideBar";
import MongoDiagram from "./MongoDiagram";

const MongoManager = () => {

    return (
        <div>
            <div className="canvasStyle" id="canvas">
                <MongoLeftSideBar/>
                <MongoDiagram/>
            </div>
        </div>
    );
};
export default MongoManager;
