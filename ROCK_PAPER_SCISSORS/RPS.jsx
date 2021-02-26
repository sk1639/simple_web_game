import React, { Component } from 'react'


//클래스의 경우 -> constructor -> render -> ref -> componentDidMount -> 
//(state,props변경-> shouldComponentupdate(return true면 리렌더링)->render->componentDidmount)
//부모가없애면 componentWillMount -> 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0]
}

export default class RPS extends Component {
    state = {
        imgCoord: '0', // 0, 142
        result: '',
        score: 0,
    };

    interval;

    componentDidMount() {//처음 렌더링이 성공적으로 실행되었을때, 리렌더링될경우 실행안됨->비동기 요청을 많이함
        this.interval = setInterval(this.changeHand, 100);
    }

    componentWillUnmount() {//부모 컴포넌트가 본인 컴포넌트가 제거되기 직전->비동기 요청 정리
        clearInterval(this.interval);
    }

    changeHand = () => {
        const { imgCoord } = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위
            })
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보
            })
        } else {
            this.setState({
                imgCoord: rspCoords.바위
            })
        }
    }

    onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다.'
            })
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다.',
                    score: prevState.score + 1
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다.',
                    score: prevState.score - 1
                }
            })
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 2000)
    }

    render() {
        const { result, imgCoord, score } = this.state
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}>
                </div>
                <div>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="paper" clanssName="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}
