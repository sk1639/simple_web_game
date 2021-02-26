import React, { Component } from 'react'
import Ball from './Ball';


function getWinNumbers() {
    const candiate = Array(45).fill().map((v, i) => i + 1); //Array.fill(45개의 array생성 후 1~45로 채워줌)
    const shuffle = [];
    while (candiate.length > 0) {
        shuffle.push(candiate.splice(Math.floor(Math.random() * candiate.length), 1)[0])

    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);

    return [...winNumbers, bonusNumber];
}



export default class Lotto extends Component {
    state = {
        WinNumbers: getWinNumbers(), // 당첨 숫자들
        WinBalls: [],
        Bonus: null, //보너스 공
        Redo: false,
    }


    timeouts = [];

    runTimeouts = () => {
        const { WinNumbers, Redo, Bonus } = this.state;
        for (let i = 0; i < WinNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        WinBalls: [...prevState.WinBalls, WinNumbers[i]]
                    }
                })
            }, (i + 1) * 1000);
        }

        console.log(Redo)
        console.log(WinNumbers)
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                Bonus: WinNumbers[6],
                Redo: true,
            })
            console.log(Bonus, Redo)
        }, 7000)

    }


    componentDidMount() {
        this.runTimeouts()

    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.WinBalls.length === 0) {
            this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((t) => {
            clearTimeout(t)
        })
    }


    onClickRedo = () => {
        this.setState({
            WinNumbers: getWinNumbers(), // 당첨 숫자들
            WinBalls: [],
            Bonus: null, //보너스 공
            Redo: false,
        })
        this.timeouts = [];
    }


    render() {
        const { WinNumbers, WinBalls, Bonus, Redo } = this.state
        return (
            <>
                <div>당첨숫자</div>
                <div id="result">
                    {WinBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스 숫자</div>
                {Bonus && <Ball number={Bonus} />}
                {Redo && <button onClick={this.onClickRedo}>한번 더 ! </button>}
            </>
        )
    }
}
