import React, {useEffect} from "react";

const BackgroundPaging = React.forwardRef ((
    {   elements, children,
        drawBoardBorderOffset, backgroundPageSize,
        amountBackgroundPages, setAmountBackgroundPages}, ref) => {

    useEffect( () => {

        let pos = getMaxXAndYOfElements(elements);
        adjustBounds(pos.x, pos.y, elements)

    },
    //Justification: Performance increase, methods should not be used as callback,
    //               as they would depend on properties which do not affect the callback
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [elements])


    // *****************************  Handle page increment/decrement  *****************************

    //TODO replace with correct values of er elements
    //Work:
    // 1. Add with and height properties to "drawBoardElement" (depending on text, width is dynamic),
    // 2. resolve elements instead of positions,
    // 3. apply offsets
    const elementWidthOffset = 150;
    const elementHeightOffset = 75;

    const oneBackgroundPageVertical = backgroundPageSize.vertical;
    const oneBackgroundPageHorizontal = backgroundPageSize.horizontal;


    function getBackgroundPageBounds(pagesHorizontal, pagesVertical) {
        return {
            x: drawBoardBorderOffset + pagesHorizontal * oneBackgroundPageHorizontal,
            y: drawBoardBorderOffset + pagesVertical * oneBackgroundPageVertical
        }
    }


    /**
     * Function to increase or decrease the amount of pages
     * displayed depending on the elements within the draw board
     * @param elementX The x-Coordinate of the element
     * @param elementY The y-Coordinate of the element
     * @param elements Optional element object, if set, the current state will not be used (as it could be already updated)
     * @required drawBoardElements elements inside the draw board need to be added to the state
     * @see drawBoardElements
     * @see setDrawBoardElements
     */
    function adjustBounds(elementX, elementY, elements){ //elements ist optional!

        if(elements == null) return;

        let currentPagesHorizontal = amountBackgroundPages.horizontal;
        let currentPagesVertical = amountBackgroundPages.vertical;

        //TODO multiple set states
        let updatedIncreasedPages = increasePageIfNecessary(elementX, elementY, currentPagesHorizontal, currentPagesVertical)


        let updatedPages = decreasePageIfNecessary(elements, updatedIncreasedPages.horizontal, updatedIncreasedPages.vertical)



        setAmountBackgroundPages(() => ({
            horizontal: updatedPages.horizontal,
            vertical: updatedPages.vertical
        }))

    }


    function increasePageIfNecessary(x, y, pagesHorizontal, pagesVertical) {
        let page = getBackgroundPageBounds(pagesHorizontal, pagesVertical);


        x = x + elementWidthOffset;
        y = y + elementHeightOffset;

        let horizontal = pagesHorizontal;
        let vertical = pagesVertical;


        while (x > page.x || y > page.y){


            if (x > page.x) {
                horizontal++;
                x = x - oneBackgroundPageHorizontal;
            }


            if (y > page.y) {
                vertical++;
                y = y - oneBackgroundPageVertical;
            }

        }

        return {
            horizontal: horizontal,
            vertical: vertical
        }

    }

    function getMaxXAndYOfElements(elements){
        if(elements == null) return;
        let maxX = 0;
        let maxY = 0;

        elements.forEach( element => {
            if(element.x + element.width  > maxX) maxX = element.x + element.width
            if(element.y + element.height > maxY) maxY = element.y + element.height
        })

        return {x: maxX + drawBoardBorderOffset, y: maxY + drawBoardBorderOffset}
    }

    function decreasePageIfNecessary(elements, pagesHorizontal, pagesVertical){

        //Get highest x and highest y, which are required to fit within the pages

        const maxXY = getMaxXAndYOfElements(elements);

        const maxX = maxXY.x;
        const maxY = maxXY.y;

        return getPageReductionForPosition(maxX, maxY, pagesHorizontal, pagesVertical)
    }


    function getPageReductionForPosition(x, y, pagesHorizontal, pagesVertical){

        let bounds = getBackgroundPageBounds(pagesHorizontal, pagesVertical);

        let newHorizontalPages = getPageReductionForAxis(x, bounds.x, pagesHorizontal, oneBackgroundPageHorizontal)
        let newVerticalPages = getPageReductionForAxis(y, bounds.y, pagesVertical, oneBackgroundPageVertical)

        return {
            horizontal: newHorizontalPages,
            vertical: newVerticalPages
        }

    }

    function getPageReductionForAxis(elementPos, pagePos, amountPages, pageSize){

        let amountDecreaseOfPages = 0;
        let reducedSize = pagePos;

        //Condition: At least 1 pages needs to be remaining
        while(amountPages > amountDecreaseOfPages){

            reducedSize = reducedSize - pageSize;

            //Reduce page by 1
            if(reducedSize > elementPos) amountDecreaseOfPages++;

            //No further reduction possible, due to element
            else break;
        }

        return amountPages - amountDecreaseOfPages
    }

    return (
            <div className="drawBoardBackgroundPage"
                ref={ref}
                style={{
                    height: `${oneBackgroundPageVertical * amountBackgroundPages.vertical}px`,
                    width:  `${oneBackgroundPageHorizontal *  amountBackgroundPages.horizontal}px`
            }}/>
    )

});

export default BackgroundPaging;


