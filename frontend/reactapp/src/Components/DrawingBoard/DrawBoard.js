import BackgroundPaging from "./BackgroundPaging";
import React, {useRef, useState} from "react";
import {useXarrow, Xwrapper} from "react-xarrows";
import SvgResizer from "./SvgResizer";
import DrawBoardElement from "./DrawBoardElement";
import ConnectionElement from "./ConnectionElement";
import {DiagramTypes} from "../../ERModell/Model/Diagram";

const DrawBoard = ({children, onDropHandler, drawBoardElements, drawBoardBorderOffset, diagramType}) => {

    const updateConnections = useXarrow();

    const [amountBackgroundPages,setAmountBackgroundPages] = useState({horizontal: 1, vertical: 1})

    const backgroundPageSize = {
        vertical: 810,
        horizontal: 576
    }

    /**
     * reference to the background pages
     * @type {React.MutableRefObject<null>}
     */
    const backgroundPageRef = useRef(null)

    /**
     * reference to the most outer div of the draw board element
     * @type {React.MutableRefObject<null>}
     */
    const mostOuterDiagramDivRef = useRef(null)

    let outerStyle;
    
    switch (diagramType) {
        case DiagramTypes.erDiagram: outerStyle = "outerDrawBoardContainerEr"; break;
        case DiagramTypes.relationalDiagram: outerStyle = "outerDrawBoardContainerRelational"; break;
    }

    outerStyle += " scrollAble";

    return (
        <React.Fragment>

            <div id="mostOuter"
                 className={outerStyle}
                 ref={mostOuterDiagramDivRef}
                 onScroll={updateConnections}>

                <Xwrapper>
                    <BackgroundPaging elements={drawBoardElements}

                                      backgroundPageSize={backgroundPageSize}
                                      drawBoardBorderOffset={drawBoardBorderOffset}

                                      amountBackgroundPages={amountBackgroundPages}
                                      setAmountBackgroundPages={setAmountBackgroundPages}
                                      ref={backgroundPageRef}/>


                    <SvgResizer mostOuterDiagramDivRef={mostOuterDiagramDivRef}
                                backgroundPageRef={backgroundPageRef}

                                backgroundPageSize={backgroundPageSize}
                                drawBoardBorderOffset={drawBoardBorderOffset}
                                amountBackgroundPages={amountBackgroundPages}


                                onDropHandler={onDropHandler}>

                        {React.Children.toArray(children).filter(({type}) => type===DrawBoardElement)}


                    </SvgResizer>

                    {React.Children.toArray(children).filter(({type}) => type===ConnectionElement)}

                </Xwrapper>

            </div>
        </React.Fragment>
    )
}

export default DrawBoard;