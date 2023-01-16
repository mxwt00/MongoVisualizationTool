import React, {useState} from "react";
import {TextField} from "@mui/material";
import {ConnectionStates} from "./ConnectionState";

/**
 * Renders the hole left side bare by orchestrating DragBarManagers for all ErTypes
 * @see DragBarManager
 */
const MongoLeftSideBar = () => {
    const [connectionState, setConnectionState] = useState(ConnectionStates.connectionPending)

    function connectToDB() {

    }

    return (

        <div className="leftSidebarContainer">

            <div className="leftSidebarSelectionContainer">

                <div className="leftSidebarMainTitle">Database Connection</div>
                <div className="spacerBig"></div>
                <hr className="sidebarDivider"/>

                <TextField
                    id="connectionString"
                    label="Connection String"
                    variant="standard"
                    defaultValue="connection string"
                />
                <div className="spacerSmall"></div>
                <TextField
                    id="dbName"
                    label="DB name"
                    variant="standard"
                    defaultValue="database"
                />
                <div className="spacerSmall"></div>
                <div>{connectionState}</div>
            </div>
        </div>

    )
}
export default MongoLeftSideBar;
