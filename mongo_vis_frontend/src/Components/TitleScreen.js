import {useDispatch} from "react-redux";
import {Button, Typography} from "@mui/material";
import React from "react";
import {AppMode} from "../ReduxStore/AppMode";
import {setMode} from "../ReduxStore/AppModeSlice";

const TitleScreen = () => {

    const dispatch = useDispatch()

    function switchAppMode(appMode) {
        dispatch(setMode(appMode))
    }

    return (
        <div>
            <Typography id="modal-modal-title" variant="h2" color="white">
                Database Toolkit
            </Typography>
            <div className="spacerBig"/>
            <Button style={{color: "white", borderColor: "white"}} variant="outlined"
                    onClick={() => switchAppMode(AppMode.mongoVisTool)}>
                MongoDB Visualisation Tool
            </Button>
        </div>
    )
}
export default TitleScreen