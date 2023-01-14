import React from "react";
import DisplayConfiguration from "../../Services/Configurations/DisplayConfiguration";
import {TextField} from "@mui/material";

/**
 * Renders the hole left side bare by orchestrating DragBarManagers for all ErTypes
 * @see DragBarManager
 */
const MongoLeftSideBar = () => {

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
                    //color="white"
                />

                <div className="leftSidebarTitle">Attributes</div>
                <hr className="sidebarDivider"/>

                <div className="leftSidebarTitle">Entities</div>
                <hr className="sidebarDivider"/>

                <div className="leftSidebarTitle">Relations</div>
                <hr className="sidebarDivider"/>

                <div className="leftSidebarTitle">IsA Structure</div>
                <hr className="sidebarDivider"/>
            </div>
            <div>
                <label htmlFor="rightBarInputField" className="rightBarInputFieldLabel">Name:</label>
                <input type="text" className="rightBarInput" id="rightBarInputField"
                       maxLength={DisplayConfiguration.maxLengthForElements}
                    //onChange={(e) => { setDisplayName(selectedObject.id, e.target.value)}}
                       value={"default DB"}/></div>
        </div>

    )
}
export default MongoLeftSideBar;
