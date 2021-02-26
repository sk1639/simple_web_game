import React, { useContext, useCallback, memo, useMemo } from 'react'
import { CODE, TableContext, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSweeper'

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444',
            }
        case CODE.OPEND:
            return {
                background: 'white',
            }
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow'
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'RED'
            }
        case CODE.CLICKED_MINE:
            return {
                background: 'red'
            }
        default:
            return {
                background: 'white'
            }
    }
}

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return '';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        default:
            return code || ' ';
    }

}


function Td({ rowIndex, cellIndex }) {
    const { tableData, dispatch, halted } = useContext(TableContext);



    const onClickTd = useCallback(() => {
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {

            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex })
                return;
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex })
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex })
                return;
            case CODE.OPEND:
            default:
                return;
        }

    }, [tableData[rowIndex][cellIndex], halted])

    const onRightClick = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex })
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex })
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted])

    return useMemo(() => (
        <td style={getTdStyle(tableData[rowIndex][cellIndex])} onClick={onClickTd} onContextMenu={onRightClick}>{getTdText(tableData[rowIndex][cellIndex])}</td>
    ), [tableData[rowIndex][cellIndex]])
}

export default memo(Td)
