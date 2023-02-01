import './App.css';
import React from "react";
import MongoManager from "./Components/MongoDBVisualization/MongoManager";
import TitleScreen from "./Components/TitleScreen";
import {theme} from "./MUITheme";
import {ThemeProvider} from "@mui/material";
import DatabaseModellingTool from "./Components/DatabaseModellingTool/ContentManagement/DatabaseModellingTool";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AppScreens} from "./AppScreens";

const App = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<TitleScreen/>}/>
                        <Route path={AppScreens.dbModellingTool} element={<DatabaseModellingTool/>}/>
                        <Route path={AppScreens.mongoVisTool} element={<MongoManager/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    )
}


export default App;
