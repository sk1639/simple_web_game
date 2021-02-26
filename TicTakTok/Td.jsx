import React, { useCallback, useEffect, useRef, memo } from 'react'
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe'


function Td(props) {
    const onClickTd = useCallback(() => {
        console.log(props.rowIndex, props.cellIndex);
        if (props.cellData) {
            return;
        }

        props.dispatch({ type: CLICK_CELL, row: props.rowIndex, cell: props.cellIndex })
    }, [props.cellData])
    return (
        <td onClick={onClickTd}>{props.cellData}</td>
    )
}

export default memo(Td)

