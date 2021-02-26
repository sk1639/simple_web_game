import React, { memo } from 'react'

function TryFuctional(props) {
    return (
        <div>
            <li key={props.index}>{props.data.try}<br /> {props.data.result}</li>
        </div>
    )
}

export default memo(TryFuctional)
