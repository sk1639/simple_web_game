import React, { useContext, memo } from 'react'
import { TableContext } from './MineSweeper'
import Tr from './tr'


function Table() {
    const { tableData } = useContext(TableContext)
    return (
        <table>
            {Array(tableData.length).fill().map((tr, i) => <Tr key={i} rowIndex={i} />)}
        </table>
    )
}

export default memo(Table)
