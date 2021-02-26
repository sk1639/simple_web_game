import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
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

function LottoF() {
    const lottoNumbers = useMemo(() => getWinNumbers, []);
    const [WinNumbers, setWinNumbers] = useState(lottoNumbers);
    const [WinBalls, setWinBalls] = useState([]);
    const [Bonus, setBonus] = useState(null)
    const [Redo, setRedo] = useState(false);
    const timeouts = useRef([])


    useEffect(() => {
        console.log('useEffect')
        runTimeouts()
        return () => {
            timeouts.current.forEach((t) => {
                clearTimeout(t)
            })
        }
    }, [timeouts.current])



    const runTimeouts = () => {
        for (let i = 0; i < WinNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, WinNumbers[i]])
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = setTimeout(() => {
            setBonus(WinNumbers[6])
            setRedo(true)
        }, 7000)
    }

    const onClickRedo = useCallback(() => {
        console.log(WinNumbers)
        setWinNumbers(getWinNumbers())
        setWinBalls([]);
        setBonus(null)
        setRedo(false);
        timeouts.current = [];
    }, [WinNumbers])

    return (
        <>
            <div>당첨숫자</div>
            <div id="result">
                {WinBalls.map((v, i) => <Ball key={v} number={v} />)}
            </div>
            <div>보너스 숫자</div>
            {Bonus && <Ball number={Bonus} />}
            {Redo && <button onClick={onClickRedo}>한번 더 ! </button>}
        </>
    )
}

export default LottoF

