import React, {useEffect, useRef, useState} from "react";
import Download from "./Download";
import Upload from "./Upload";
import {diagramTypes} from "../ERModell/Model/Diagram";

export function SaveAndLoad({children, metaInformation, diagramType, changeToErDiagram, changeToRelationalDiagram}){

    const [currentDiagram, updateDiagram] = useState(diagramTypes.erDiagram)
    const [loadProcessIsActive, setLoadProcessStatus] = useState(false)

    if(currentDiagram !== diagramType) {
        updateDiagram(diagramType)
        setLoadProcessStatus(true)
    }


    //We use useRef as "instance variable" (normally used for DOM Refs) https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    // avoid setting refs during rendering
    const erContent = useRef({...metaInformation, projectType: diagramTypes.erDiagram, elements: [], connections: []})
    const relationalContent = useRef({...metaInformation, projectType: diagramTypes.relationalDiagram, elements: [], connections: []})


    function syncErContent(drawBoardElements, connections){
        console.log("sync er content")
        console.log(erContent.current)
        if(loadProcessIsActive) return;

        erContent.current = {
            ...metaInformation,
            projectType: diagramTypes.erDiagram,
            drawBoardContent: {elements: drawBoardElements, connections: connections}
        }
    }

    console.log("ER")
    console.log(erContent.current)
    console.log("Relational")
    console.log(relationalContent.current)

    function syncRelContent(drawBoardElements, connections){
        console.log("sync rel content")
        console.log(relationalContent.current)
        if(loadProcessIsActive) return;

        relationalContent.current = {
            ...metaInformation,
            projectType: diagramTypes.relationalDiagram,
            drawBoardContent: {elements: drawBoardElements, connections: connections}
        }
    }

    /**
     * Upload logic
     */

        //Import project
    const [importedContent, setImportedContent] = useState({})

    function importDrawBoardData(importedContent){
        console.log("parsing...")
        let importedJson = JSON.parse(importedContent)
        console.log("parsed")
        console.log(importedJson)
        setImportedContent(importedJson)
    }

    function triggerImportComplete(){
        setImportedContent(null);
        setLoadProcessStatus(false)
    }

    const SaveAndLoadProps = {
        syncErContent: syncErContent,
        syncRelContent: syncRelContent,
        importedContent: importedContent,
        triggerImportComplete: triggerImportComplete
    }


    useEffect( () => {

        //console.log("REIMPORT OF ")
        //console.log(diagramType)
        //console.log("ERDATA")
        //console.log(erContent.current)
        //console.log("RELDATA")
        //console.log(relationalContent.current)
        if(diagramType === diagramTypes.erDiagram)  setImportedContent(erContent.current)
        if(diagramType === diagramTypes.relationalDiagram) setImportedContent(relationalContent.current)

    },[diagramType])



    const erTabActive = diagramType === diagramTypes.erDiagram ? "TabsButtonActive" : "TabsButtonNotActive";
    const relationalTabActive = diagramType === diagramTypes.relationalDiagram ? "TabsButtonActive" : "TabsButtonNotActive";

    let erTabStyle = `TabsButton ${erTabActive}`;
    let relationalTabStyle = `TabsButton ${relationalTabActive}`;

    return (
        <React.Fragment>

            <div className="Head">
                <button className={erTabStyle} onClick={changeToErDiagram}>Er Diagram</button>
                <button className={relationalTabStyle} onClick={changeToRelationalDiagram}>Relational Diagram</button>

                <Download erContent={erContent}/>
                <Upload importDrawBoardData={importDrawBoardData}/>
            </div>
            {React.cloneElement(children, { ...SaveAndLoadProps  })}
        </React.Fragment>
    )
}
export default SaveAndLoad;