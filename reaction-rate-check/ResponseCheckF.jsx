import React, { useState, useRef } from 'react'


function ResponseCheckF() {
    const [State, setState] = useState('waiting')
    const [Message, setMessage] = useState('클릭해서 시작하세여')
    const [Result, setResult] = useState([])
    const timeOut = useRef(null)
    const startTime = useRef()
    const endTime = useRef()

    const onClickScreen = () => {
        if (State === 'waiting') {
            setState('ready')
            setMessage('초록색이 되면 클릭하세요')
            timeOut.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭!!')
                startTime.current = new Date()
            }, Math.floor(Math.random() * 1000) + 2000)
        } else if (State === 'ready') { //성급하게 클릭
            clearTimeout(timeOut.current)
            setState('waiting');
            setMessage('너무 성급하셨습니다! 초록샏이 된 후에 클릭하세요.')
        } else if (State === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요')
            setResult([...Result, endTime.current - startTime.current])
        }
    }


    const onClickReset = () => {
        setResult([])
    }


    const renderAverage = () => {
        return Result.length === 0 ? null : <div>평균시간 : {Result.reduce((a, c) => a + c) / Result.length}ms</div>
    }

    return (
        <>
            <div
                id="screen"
                className={State}
                onClick={onClickScreen}
            >
                {Message}
            </div>
            {/* {
                (() => {
                    if (Result.length === 0) {
                        return null;

                    } else {
                        return <div>평균시간 : {Result.reduce((a, c) => a + c) / Result.length}ms</div>
                    }
                })
            } */}


            <button onClick={onClickReset}>Reset</button>
            {renderAverage()}

        </>
    )
}

export default ResponseCheckF





// export default class ResponseCheck extends Component {
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작하세요',
//         result: [],

//     }

//     timeout;
//     startTime;
//     endTime;


//     onClickScreen = () => {
//         const { state, message, result } = this.state;
//         if (state === 'waiting') {
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭하세요.'
//             });
//             this.timeout = setTimeout(() => {
//                 this.setState({
//                     state: 'now',
//                     message: '지금 클릭!!'
//                 });
//                 this.startTime = new Date()
//             }, Math.floor(Math.random() * 1000) + 2000)
//         } else if (state === 'ready') { //성급하게 클릭
//             clearTimeout(this.timeout)
//             this.setState({
//                 state: 'waiting',
//                 message: '너무 성급하셨습니다! 초록색이 된 후에 클릭하세요',
//             })
//         } else if (state === 'now') {
//             this.endTime = new Date();
//             this.setState((prevState) => {
//                 console.log(prevState)
//                 return {
//                     state: 'waiting',
//                     result: [...prevState.result, this.endTime - this.startTime],
//                     message: '클릭해서 시작하세요'
//                 }
//             })
//             console.log(result)
//         }

//     }



//     onClickReset = () => {
//         const { result } = this.state
//         this.setState({
//             result: []
//         })
//     }

//     render() {
//         return (
//             <>
//                 <div
//                     id="screen"
//                     className={this.state.state}
//                     onClick={this.onClickScreen}
//                 >
//                     {this.state.message}
//                 </div>
//                 <button onClick={this.onClickReset}>Reset</button>
//                 {this.renderAverage()}

//             </>
//         )
//     }
// }
