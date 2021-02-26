import React, { useState, useRef } from 'react'

function GuGudan() {
    const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = React.useState('');
    const [result, setResult] = React.useState('');

    const inputref = React.useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const result = first * second
        if (Number(value) === result) {
            setResult('정답: ' + value);
            setFirst(Math.ceil(Math.random() * 9),)
            setSecond(Math.ceil(Math.random() * 9),)
            setValue('')
            inputref.current.focus();
        } else {
            setResult('땡!');
            inputref.current.focus();
        }
    }

    return (
        <>
            <div> {first} 곱하기 {second} 는 ? </div>
            <form onSubmit={onSubmit}>
                <input ref={inputref} onChange={onChangeInput} value={value} />
                <button>입력!</button>
            </form>
            <div id="result">{result}</div>
        </>
    )
}

export default GuGudan