import React from 'react';
import '../../Playground.css';
import {ACTIONSTATE, OBJECTTYPE} from "../../ActionState";
import {ERTYPE} from "../../ErType";
import {resolveObjectById} from "../../Util";


//We hold here the selected object ! when we change anything this will still be the "old" object, the new object is a clone of this one
//In zukunft arbeiten wir hier deshalb wieder nur mit der selectedId anstatt dem object
export const Header = ({selectedObjectId, setDisplayName, drawBoardElements, connections}) => {

    if(selectedObjectId == null) return null;

    let selectedObject = resolveObjectById(selectedObjectId, drawBoardElements, connections)
    if (selectedObject == null) return null;


    const isConnection = selectedObject.type === OBJECTTYPE.Connection
    const isIsAStructure = selectedObject.erType ? selectedObject.erType === ERTYPE.IsAStructure : false;

    if(isIsAStructure) {
        return (
            <div>{ERTYPE[selectedObject.erType].toolTipTitle}</div>
        )
    }

    if(isConnection) {
        return (
            <div>Association</div>
        )
    }


    return (
        <React.Fragment>
            {ERTYPE[selectedObject.erType].toolTipTitle}
            <div>{selectedObject.displayName}</div>
            <div> Name:
                <input type="text"
                       onChange={(e) => { setDisplayName(selectedObject.id, e.target.value)}}
                        defaultValue={selectedObject.displayName}/></div>
        </React.Fragment>
    )
}

export const Footer = ({selectedObjectId, removeElement, setActionState, drawBoardElements, connections, toAddConnectionState}) => {

    if(selectedObjectId == null) return null;

    let selectedObject = resolveObjectById(selectedObjectId, drawBoardElements, connections)
    if (selectedObject == null) return null;

    if(selectedObject.objectType === OBJECTTYPE.Connection){
        return ( <FooterDelete removeElement={removeElement} selectedObjectId={selectedObjectId} />)
    }

    return (

        <React.Fragment>
            <FooterAddConnection toAddConnectionState={toAddConnectionState} selectedObjectId={selectedObjectId}/>
            <FooterDelete removeElement={removeElement} selectedObjectId={selectedObjectId}/>
        </React.Fragment>

    )
}

const FooterDelete = ({removeElement, selectedObjectId}) => {
    return(
        <button onClick={() => removeElement(selectedObjectId)}>Delete</button>
    )
};

//bad setState
const FooterAddConnection = ({toAddConnectionState, selectedObjectId}) => {
    return(
        <button onClick={() => toAddConnectionState(selectedObjectId)}>Add Association</button>
    )
}
