import React, { useState, useRef } from 'react'
import Try from './Try';
import TryFuctional from './TryFuctional';

function getNumbers() {
    //숫자 네개 랜덤으로 만드는 함수 겹치지않게
    const candiate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
        let random_number = Math.floor(Math.random() * (9 - i)) //배열번호 뽑기
        const chosen = candiate.splice(Math.floor(random_number), 1)[0]; //해당 배열번호 숫자를 빼서 chosen에 담는다. 그러면 남는 배열은 8개, 다음엔 8개 배열중에 하나를 제거하고
        array.push(chosen)
    }
    return array;
}




function NumberFuctional() {

    const [Result, setResult] = useState('');
    const [Value, setValue] = useState('');
    const [Answer, setAnswer] = useState(getNumbers())
    const [Tries, setTries] = useState([])

    const ref = useRef(null)


    const onSubmitForm = (e) => {
        e.preventDefault();
        if (Value === Answer.join('')) {
            setResult('홈런!')
            setTries([...Tries, { try: Value, result: '홈런!' }])
            alert('홈런! 게임을 다시 시작합니다!!');
            setValue('')
            setAnswer(getNumbers())
            setTries([])
            ref.current.focus();
        } else { // 틀린 경우
            const answerArray = Value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (Tries.length >= 9) { //10번 이상 틀렸을 경우
                setResult(`10번 넘게 틀려서 실패! 답은 ${Answer.join(',')}였습니다`)
                alert('게임을 다시 시작합니다!!');
                setValue('')
                setAnswer(getNumbers())
                setTries([])
                ref.current.focus();
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === Answer[i]) {
                        strike += 1;
                    } else if (Answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries([...Tries, { try: Value, result: `${strike} 스트라이크, ${ball} 볼` }])

            }
        }

    }

    const onChangeInput = (e) => {
        console.log(Answer);
        setValue(e.target.value)
    }


    return (
        <div>
            <h1>{Result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} ref={ref} onChange={onChangeInput} value={Value} />
                <button>입력</button>
            </form>
            <div>시도 : {Tries.length}</div>
            <ul>
                {Tries.map((v, i) => {
                    return (<TryFuctional data={v} index={i} />)
                })}
            </ul>
        </div >
    )

}

export default NumberFuctional
