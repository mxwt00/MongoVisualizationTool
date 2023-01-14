import MongoLeftSideBar from "./MongoLeftSideBar";

const MongoManager = () => {

    return (

        <div>
            <div className="canvasStyle" id="canvas">
                {/* The left toolbar, containing the elements to drag into the draw board  */}
                <MongoLeftSideBar/>
            </div>
        </div>
    );
};
export default MongoManager;
