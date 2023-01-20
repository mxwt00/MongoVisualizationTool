import MongoLeftSideBar from "./MongoLeftSideBar";
import {ThemeProvider} from "@mui/material";
import {theme} from "../../MUITheme";
import MongoDiagram from "./MongoDiagram";

const MongoManager = () => {

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div className="canvasStyle" id="canvas">
                    {/* The left toolbar, containing the elements to drag into the draw board  */}
                    <MongoLeftSideBar/>
                    <MongoDiagram/>
                </div>
            </div>
        </ThemeProvider>
    );
};
export default MongoManager;
