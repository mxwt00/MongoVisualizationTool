import React, {useState} from "react";
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel, InputLabel,
    MenuItem, Select,
    TextField,
    Typography
} from "@mui/material";
import {ConnectionStates} from "./ConnectionState";
import axios from "axios";
import {setCollections} from "../../ReduxStore/MongoContentSlice";
import {useDispatch} from "react-redux";

/**
 * Renders the hole left side bare by orchestrating DragBarManagers for all ErTypes
 * @see DragBarManager
 */
const MongoLeftSideBar = () => {
    const [connectionState, setConnectionState] = useState(ConnectionStates.connectionPending)
    const [connectionString, setConnectionString] = useState("mongodb+srv://mvt:mvt@testcluster.biadm2g.mongodb.net/?retryWrites=true&w=majority")
    const [dbName, setDbName] = useState("sample_mflix")
    const [analyseRef, setAnalyseRef] = useState(false)
    const [sortMethod, setSortMethod] = useState("documentNumber")

    const dispatch = useDispatch()

    //TODO markierung von tab fixen

    function connectToDB() {
        console.log("connecting to db")
        setConnectionState(ConnectionStates.connecting)
        //TODO url relativ abfragen
        const url = "http://127.0.0.1:5000/connect"

        let contentToSend = {
            connection_string: connectionString,
            database: dbName,
            analyse_ref: analyseRef,
            sort_method: sortMethod
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

    const analyseReferenceLabel = "Analyse References\n(May take a long time)"

    return (

        <div className="leftSidebarContainer">

            <div className="leftSidebarSelectionContainer">

                <Typography id="modal-modal-title" variant="h4" color="white" sx={{m: 1, minWidth: 220}}>
                    Database Connection
                </Typography>
                <hr className="sidebarDivider"/>

                <TextField
                    id="connectionString"
                    label="Connection String"
                    variant="standard"
                    defaultValue="connection string"
                    onChange={(e) => setConnectionString(e.target.value)}
                    sx={{m: 1, minWidth: 220}}
                />
                <TextField
                    id="dbName"
                    label="DB name"
                    variant="standard"
                    defaultValue="database"
                    onChange={(e) => setDbName(e.target.value)}
                    sx={{m: 1, minWidth: 220}}
                />
                <div className="spacerSmall"></div>
                <FormControlLabel control={<Checkbox color="primary" onChange={() => (setAnalyseRef(!analyseRef))}/>}
                                  label={<Typography variant="body1" color="white" style={{whiteSpace: 'pre-line'}}
                                                     align="left">
                                      {analyseReferenceLabel}
                                  </Typography>}
                                  sx={{m: 1, minWidth: 220}}
                />
                <FormControl variant="standard" sx={{m: 1, minWidth: 220}}>
                    <InputLabel id="demo-simple-select-filled-label">Sort Method</InputLabel>
                    <Select
                        labelId="sort-method-select-label"
                        id="sort-method-select"
                        value={sortMethod}
                        onChange={(e) => setSortMethod(e.target.value)}
                    >
                        <MenuItem value={"documentNumber"}>Number of documents</MenuItem>
                        <MenuItem value={"avgAge"}>Average document age</MenuItem>
                    </Select>
                </FormControl>

                <div className="spacerSmall"></div>
                <Button style={{color: "white", borderColor: "white"}}
                        variant="outlined"
                        onClick={connectToDB}
                        sx={{m: 1, minWidth: 220}}
                >
                    Connect and Analyse
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
