import React, { Component, createRef } from 'react'
import Try from './Try';

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


export default class NumberBaseBall extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), //ex : [1,3,5,7]
        tries: [],
    }



    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState({
                result: '홈런!',
                tries: [...this.state.tries, { try: this.state.value, result: '홈런!' }]
            })
            alert('게임을 다시 시작합니다!!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            })
            this.inputRef.current.focus();
        } else { // 틀린 경우
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length >= 9) { //10번 이상 틀렸을 경우
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다`,
                });
                alert('게임을 다시 시작합니다!!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                })
                this.inputRef.current.focus();
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike += 1;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState({
                    tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼` }]
                })
                this.inputRef.current.focus();
            }

        }

    }

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value
        })
    }


    inputRef = createRef();

    render() {
        return (
            <div>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} onChange={this.onChangeInput} value={this.state.value} />
                    <button>입력</button>
                </form>
                <div>시도 : {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (<Try data={v} index={i} />)
                    })}
                </ul>
            </div >
        )
    }
}
