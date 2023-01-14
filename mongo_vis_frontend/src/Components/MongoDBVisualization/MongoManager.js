import MongoLeftSideBar from "./MongoLeftSideBar";
import {ThemeProvider} from "@mui/material";
import {theme} from "../../MUITheme";

const MongoManager = () => {

    return (
        <ThemeProvider theme={theme}>
            <div>
                <div className="canvasStyle" id="canvas">
                    {/* The left toolbar, containing the elements to drag into the draw board  */}
                    <MongoLeftSideBar/>
                </div>
            </div>
        </ThemeProvider>
    );
};
export default MongoManager;
