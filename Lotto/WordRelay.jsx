import React, { useState, useRef } from 'react'

function WordRelay() {
    const [Word, setWord] = useState('해질녘');
    const [Value, setValue] = useState('')
    const [Result, setResult] = useState('')
    const inputRef = useRef(null)

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (Word[Word.length - 1] === Value[0]) {
            setResult('정답')
            setWord(Value);
            setValue('')
            inputRef.current.focus();
        } else {
            setResult('오답')
            setValue('');
            inputRef.current.focus();
        }
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <div>{Word}</div>
            <form onSubmit={onSubmitForm}>
                <label htmlFor="wordInput">글자를 입력하세요</label>
                <input id="wordInput" className="wordInput" ref={inputRef} value={Value} onChange={onChangeInput} />
                <button>입력!!!</button>
            </form>
            <div>{Result}</div>
        </>
    )
}

export default WordRelay


// export default class WordRelay extends Component {
//     state = {
//         word: '해질녘',
//         value: '',
//         result: '',
//     }

//     onSubmitForm = (e) => {
//         e.preventDefault();
//         if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
//             this.setState({
//                 result: '딩동댕',
//                 word: this.state.value,
//                 value: ''
//             });
//             this.input.focus();
//         } else {
//             this.setState({
//                 result: '땡',
//                 value: '',
//             })
//         }

//     }

//     onChangeInput = (e) => {
//         this.setState({ value: e.target.value })
//     }

//     input;

//     onRefInput = (c) => {
//         this.input = c;
//     }



//     render() {
//         return (
//             <>
//                 <div>{this.state.word}</div>
//                 <form onSubmit={this.onSubmitForm}>
//                     <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
//                     <button>입력!!!</button>
//                 </form>
//                 <div>{this.state.result}</div>
//             </>
//         )
//     }
// }
