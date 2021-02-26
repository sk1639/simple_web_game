import React, { useContext, memo } from 'react'
import { TableContext } from './MineSweeper'
import Td from './Td'

function Tr({ rowIndex }) {
    const { tableData } = useContext(TableContext)
    return (
        <tr>
            {tableData[0] && Array(tableData[0].length).fill().map((td, i) => <Td key={i} rowIndex={rowIndex} cellIndex={i} />)}
        </tr>
    )
}

export default memo(Tr)