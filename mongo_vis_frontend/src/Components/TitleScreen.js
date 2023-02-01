import {Button, Typography} from "@mui/material";
import React from "react";
import {AppScreens} from "../AppScreens";
import {useNavigate} from "react-router-dom";

const TitleScreen = () => {

    const navigate = useNavigate()

    function switchAppMode(appMode) {
        navigate(appMode)
    }

    return (
        <div>
            <Typography id="modal-modal-title" variant="h2" color="white">
                Database Toolkit
            </Typography>
            <div className="spacerBig"/>
            <Button style={{color: "white", borderColor: "white"}} variant="outlined"
                    onClick={() => switchAppMode(AppScreens.mongoVisTool)}>
                MongoDB Visualisation Tool
            </Button>
            <Button style={{color: "white", borderColor: "white"}} variant="outlined"
                    onClick={() => switchAppMode(AppScreens.dbModellingTool)}>
                Database Modelling Tool
            </Button>
        </div>
    )
}
export default TitleScreen