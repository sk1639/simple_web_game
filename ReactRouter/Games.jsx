import React from 'react'
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom'
import NumberFuctional from '../NuberBaseBall/NumberFuctional'
import RPSF from '../ROCK_PAPER_SCISSORS/RPSF'
import LottoF from '../Lotto/LottoF'

function Games() {
    return (
        <BrowserRouter>
            <div>
                <Link to="/number-baseball">숫자야구</Link>

                <Link to="/RPS">가위바위보</Link>

                <Link to="/lotto-generator">숫자야구</Link>

            </div>
            <div>
                <Route path="/number-baseball" component={NumberFuctional}></Route>
                <Route path="/RPS" component={RPSF}></Route>
                <Route path="/lotto-generator" component={LottoF}></Route>
            </div>
        </BrowserRouter >
    )
}

export default Games
