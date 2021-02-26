import React, { Component } from 'react'

export default class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: [],

    }

    timeout;
    startTime;
    endTime;


    onClickScreen = () => {
        const { state, message, result } = this.state;
        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.'
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭!!'
                });
                this.startTime = new Date()
            }, Math.floor(Math.random() * 1000) + 2000)
        } else if (state === 'ready') { //성급하게 클릭
            clearTimeout(this.timeout)
            this.setState({
                state: 'waiting',
                message: '너무 성급하셨습니다! 초록색이 된 후에 클릭하세요',
            })
        } else if (state === 'now') {
            this.endTime = new Date();
            this.setState((prevState) => {
                console.log(prevState)
                return {
                    state: 'waiting',
                    result: [...prevState.result, this.endTime - this.startTime],
                    message: '클릭해서 시작하세요'
                }
            })
            console.log(result)
        }

    }

    renderAverage = () => {
        const { result } = this.state
        return result.length === 0 ? null : <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
    }

    onClickReset = () => {
        const { result } = this.state
        this.setState({
            result: []
        })
    }

    render() {
        return (
            <>
                <div
                    id="screen"
                    className={this.state.state}
                    onClick={this.onClickScreen}
                >
                    {this.state.message}
                </div>
                <button onClick={this.onClickReset}>Reset</button>
                {this.renderAverage()}

            </>
        )
    }
}
