import MongoLeftSideBar from "./MongoLeftSideBar";
import MongoDiagram from "./MongoDiagram";

const MongoManager = () => {

    return (
        <div style={{textAlign: "center"}}>
            <div className="mongoManager" id="canvas">
                <MongoLeftSideBar/>
                <MongoDiagram/>
            </div>
        </div>
    );
};
export default MongoManager;
