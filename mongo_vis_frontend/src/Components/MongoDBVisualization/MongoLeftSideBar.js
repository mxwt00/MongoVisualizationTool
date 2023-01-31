import React, {useState} from "react";
import {Button, CircularProgress, TextField, Typography} from "@mui/material";
import {ConnectionStates} from "./ConnectionState";
import axios from "axios";
import {setCollections} from "../../ReduxStore/MongoContentSlice";
import {useDispatch, useSelector} from "react-redux";

/**
 * Renders the hole left side bare by orchestrating DragBarManagers for all ErTypes
 * @see DragBarManager
 */
const MongoLeftSideBar = () => {
    const [connectionState, setConnectionState] = useState(ConnectionStates.connectionPending)
    const [connectionString, setConnectionString] = useState("mongodb+srv://mvt:mvt@testcluster.biadm2g.mongodb.net/?retryWrites=true&w=majority")
    const [dbName, setDbName] = useState("sample_mflix")

    let collections = useSelector((state) => state.mongoContent.collections)
    const dispatch = useDispatch()

    //TODO markierung von tab fixen

    function connectToDB() {
        console.log("connecting to db")
        setConnectionState(ConnectionStates.connecting)
        //TODO url relativ abfragen
        const url = "http://127.0.0.1:5000/connect"

        let contentToSend = {
            connection_string: connectionString,
            database: dbName
        };

        axios.post(url, contentToSend).then((response) => {
            connectionSuccessful(response)
            dispatch(setCollections(response.data))
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

    function showCircularProgress() {
        if (connectionState === ConnectionStates.connecting) {
            return (
                <div>
                    <div className="spacerSmall"></div>
                    <CircularProgress style={{'color': 'white'}}/>
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
    }

    return (

        <div className="leftSidebarContainer">

            <div className="leftSidebarSelectionContainer">

                <Typography id="modal-modal-title" variant="h4" color="white">
                    Database Connection
                </Typography>
                <div className="spacerSmall"></div>
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
                <Button style={{color: "white", borderColor: "white"}} variant="outlined" onClick={connectToDB}>
                    Connect
                </Button>
                <div className="spacerSmall"></div>
                <Typography id="modal-modal-title" variant="body1" color="white">
                    {connectionState}
                    {showCircularProgress()}
                </Typography>
            </div>
        </div>

    )
}
export default MongoLeftSideBar;
