import MongoLeftSideBar from "./MongoLeftSideBar";
import {ThemeProvider} from "@mui/material";
import {theme} from "../../MUITheme";
import MongoDiagram from "./MongoDiagram";
import DetailViewPopUp from "./DetailViewPopUp";

const MongoManager = () => {

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div className="canvasStyle" id="canvas">
                    <MongoLeftSideBar/>
                    <MongoDiagram/>
                </div>
            </div>
        </ThemeProvider>
    );
};
export default MongoManager;
