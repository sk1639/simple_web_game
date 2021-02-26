import React, { memo } from 'react'
import Td from './Td'


function Tr(props) {
    return (
        <tr>
            {Array(props.rowData.length).fill().map((td, i) => <Td key={i} rowIndex={props.rowIndex} cellIndex={i} cellData={props.rowData[i]} dispatch={props.dispatch} />)
            }
        </tr>
    )
}

export default memo(Tr)

