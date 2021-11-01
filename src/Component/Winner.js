import React from 'react';


function Winner() {
    const currentTurn = localStorage.currentTurn;
    let msg = '';
    if (currentTurn == 'X') {
        msg = <h1 className="display-5">Player 1 (X) has been disqualified and player 2 (O) won the match</h1>
    } else if (currentTurn == 'O') {
        msg = <h1 className="display-5">Player 2 (O) has been disqualified and player 1 (X) won the match</h1>
    } else if (currentTurn == 'OWIN') {
        msg = <h1 className="display-5">Player 2 (O) won the match</h1>
    } else if (currentTurn == 'XWIN') {
        msg = <h1 className="display-5">Player 1 (X) won the match</h1>
    } else if (currentTurn == 'Draw') {
        msg = <h1 className="display-5">Match has been drown.</h1>
    }

    const XTotalWin = (localStorage.XTotalWin == undefined || localStorage.XTotalWin == null) ? 0 : localStorage.XTotalWin;
    const OTotalWin = (localStorage.OTotalWin == undefined || localStorage.OTotalWin == null) ? 0 : localStorage.OTotalWin;

    function btnHomePageClick() {
        localStorage.removeItem('currentTurn');
        localStorage.removeItem('XTotalWin');
        localStorage.removeItem('OTotalWin');
        window.location.href = '/';
    }

    return (
        <div className="container">
            <div className="jumbotron">
                {msg}
                <hr />
                <p>Player 1(X) Total Win - {XTotalWin}</p>
                <p>Player 2(O) Total Win - {OTotalWin}</p>

                <p className="lead">
                    <a href="/game" className="btn btn-success" role="button">Play Again</a> &nbsp;&nbsp;
                    <button className="btn btn-primary" onClick={btnHomePageClick}>Exit</button>
                </p>
            </div>
        </div>
    );
}

export default Winner