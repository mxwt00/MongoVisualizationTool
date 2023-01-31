import './App.css';
import React from "react";
import {AppMode} from "./ReduxStore/AppMode";
import {useSelector} from "react-redux";
import ContentManager from "./Components/DatabaseModellingTool/ContentManagement/ContentManager";
import MongoManager from "./Components/MongoDBVisualization/MongoManager";
import TitleScreen from "./Components/TitleScreen";
import {theme} from "./MUITheme";
import {ThemeProvider} from "@mui/material";
import DatabaseModellingTool from "./Components/DatabaseModellingTool/ContentManagement/DatabaseModellingTool";

const App = () => {
    let appMode = useSelector((state) => state.appMode.mode)

    function renderScreen() {
        switch (appMode) {
            case AppMode.titleScreen:
                return (<TitleScreen/>)
            case AppMode.erModellingTool:
                return (<DatabaseModellingTool/>)
            case AppMode.mongoVisTool:
                return (<MongoManager/>)
            default:
                return (<TitleScreen/>)
        }
    }

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                {renderScreen()}
            </ThemeProvider>
        </div>
    )
}


export default App;
