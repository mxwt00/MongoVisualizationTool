import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import {ConnectionStates} from "./ConnectionState";
import axios from "axios";

/**
 * Renders the hole left side bare by orchestrating DragBarManagers for all ErTypes
 * @see DragBarManager
 */
const MongoLeftSideBar = () => {
    const [connectionState, setConnectionState] = useState(ConnectionStates.connectionPending)
    const [connectionString, setConnectionString] = useState("connection string")
    const [dbName, setDbName] = useState("database")

    //TODO markierung von tab fixen

    function connectToDB() {
        console.log("connecting to db")
        //TODO url relativ abfragen
        const url = "http://127.0.0.1:8081/connect"

        let contentToSend = {
            connection_string: connectionString,
            database: dbName
        };

        axios.post(url, contentToSend).then((response) => {
            connectionSuccessful(response)
        }).catch(error => connectionFailed(error))
    }

    function connectionSuccessful(response) {
        console.log("data: " + response.data)
        setConnectionState(ConnectionStates.connected)
    }


    function connectionFailed(error) {
        console.log(error)
        setConnectionState(ConnectionStates.connectionFailed)
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
                    onChange={(e) => setConnectionString(e.target.value)}
                />
                <div className="spacerSmall"></div>
                <TextField
                    id="dbName"
                    label="DB name"
                    variant="standard"
                    defaultValue="database"
                    onChange={(e) => setDbName(e.target.value)}
                />
                <div className="spacerSmall"></div>
                <Button variant="outlined" onClick={connectToDB}>Connect</Button>
                <div className="spacerSmall"></div>
                <div>{connectionState}</div>
            </div>
        </div>

    )
}
export default MongoLeftSideBar;