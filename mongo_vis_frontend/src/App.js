import './App.css';
import React from "react";
import {AppMode} from "./ReduxStore/AppMode";
import {useSelector} from "react-redux";
import ContentManager from "./Components/DatabaseModellingTool/ContentManagement/ContentManager";
import MongoManager from "./Components/MongoDBVisualization/MongoManager";
import TitleScreen from "./Components/TitleScreen";
import {theme} from "./MUITheme";
import {ThemeProvider} from "@mui/material";

const App = () => {
    let appMode = useSelector((state) => state.appMode.mode)

    function renderScreen() {
        switch (appMode) {
            case AppMode.titleScreen:
                return (<TitleScreen/>)
            case AppMode.erModellingTool:
                return (<ContentManager/>)
            case AppMode.mongoVisTool:
                return (<MongoManager/>)
            default:
                return (<TitleScreen/>)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                {renderScreen()}
            </div>
        </ThemeProvider>
    )
}


export default App;
