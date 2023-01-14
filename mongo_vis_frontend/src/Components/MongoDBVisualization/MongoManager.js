import LeftSideBar from "../ErModel/LeftSideBar/LeftSideBar";

const MongoManager = () => {

    return (

        <div>
            <div className="canvasStyle" id="canvas">
                {/* The left toolbar, containing the elements to drag into the draw board  */}
                <LeftSideBar/>
            </div>
        </div>
    );
};
export default MongoManager;
