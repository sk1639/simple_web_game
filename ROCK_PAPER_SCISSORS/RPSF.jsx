import React, { useState, useEffect, useRef } from 'react'


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


function RPSF() {
    const [ImgeCoord, setImgeCoord] = useState('0')
    const [Result, setResult] = useState(rspCoords.바위)
    const [Score, setScore] = useState(0)
    const interval = useRef();


    useEffect(() => {//componentDidMount, componentDidUpdata
        interval.current = setInterval(changeHand, 100);

        return () => {//componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [ImgeCoord])


    const changeHand = () => {
        if (ImgeCoord === rspCoords.바위) {
            setImgeCoord(rspCoords.가위)
        } else if (ImgeCoord === rspCoords.가위) {
            setImgeCoord(rspCoords.보)
        } else {
            setImgeCoord(rspCoords.바위)
        }
    }

    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(ImgeCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다.')
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다.')
            setScore(Score + 1)

        } else {
            setResult('졌습니다.');
            setScore(Score - 1)
        }
        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 2000)
    }

    return (
        <div>
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${ImgeCoord} 0` }}>
                </div>
                <div>
                    <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                    <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                    <button id="paper" clanssName="btn" onClick={onClickBtn('보')}>보</button>
                </div>
                <div>{Result}</div>
                <div>현재 {Score}점</div>
            </>
        </div>
    )
}

export default RPSF
