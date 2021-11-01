import React from 'react';
import Board from './Board';
import './Game.css';


const calculateWinner = (squares) => {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i += 1) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {


            document.getElementsByTagName('button').disabled = true;

            localStorage.currentTurn = localStorage.currentTurn == 'X' ? 'OWIN' : 'XWIN';

            setTimeout(x => {

                if (localStorage.currentTurn == 'OWIN') {
                    localStorage.OTotalWin = (localStorage.OTotalWin == undefined || localStorage.OTotalWin == null) ? 1 : ((parseInt(localStorage.OTotalWin)) + 1);

                } else if (localStorage.currentTurn == 'XWIN') {
                    localStorage.XTotalWin = (localStorage.XTotalWin == undefined || localStorage.XTotalWin == null) ? 1 : (parseInt(localStorage.XTotalWin) + 1);
                }

                window.location.href = '/winner';

            }, 2000)


            return { winner: squares[a], winnerRow: lines[i] };
        }
    }

    return { winner: null, winnerRow: null };
};

const getLocation = (move) => {

    const locationMap = {
        0: 'row: 1, col: 1',
        1: 'row: 1, col: 2',
        2: 'row: 1, col: 3',
        3: 'row: 2, col: 1',
        4: 'row: 2, col: 2',
        5: 'row: 2, col: 3',
        6: 'row: 3, col: 1',
        7: 'row: 3, col: 2',
        8: 'row: 3, col: 3',
    };

    return locationMap[move];
};

class Game extends React.Component {

    disableBtn = false;
    countdownTimer;
    isCurrentTurnX = true;
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            currentStepNumber: 0,
            xIsNext: true,
        };

        localStorage.currentTurn = 'X';

    }

    handleClick(i) {

        const history = this.state.history.slice(0, this.state.currentStepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        localStorage.currentTurn = this.state.xIsNext ? 'O' : 'X';

        this.setState({
            history: history.concat([
                {
                    squares,
                    currentLocation: getLocation(i),
                    stepNumber: history.length,
                },
            ]),
            xIsNext: !this.state.xIsNext,
            currentStepNumber: history.length,
        });
    }

    jumpTo(step) {
        this.setState({
            currentStepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }

    sortMoves() {
        this.setState({
            history: this.state.history.reverse(),
        });
    }


    resetCountDownTimer() {

        clearInterval(this.countDownTimer);

        var timeleft = 10;

        this.countDownTimer = setInterval(function () {

            document.getElementById("timer").innerHTML = (timeleft);

            if (timeleft == 0) {

                clearInterval(this.countDownTimer);

                this.disableBtn = true;

                document.getElementById('msgLower').innerHTML = 'Times Up';

                setTimeout(() => {

                    if (localStorage.currentTurn == 'X') {
                        localStorage.OTotalWin = (localStorage.OTotalWin == undefined || localStorage.OTotalWin == null) ? 1 : ((parseInt(localStorage.OTotalWin)) + 1);

                    } else if (localStorage.currentTurn == 'O') {
                        localStorage.XTotalWin = (localStorage.XTotalWin == undefined || localStorage.XTotalWin == null) ? 1 : (parseInt(localStorage.XTotalWin) + 1);
                    }
                    window.location.href = '/winner';
                }, 2000)
            }

            timeleft--;

            if (timeleft < 0)
                timeleft = 0;

        }, 1000);

    }

    btnQuitClick() {

        localStorage.removeItem('currentTurn');
        localStorage.removeItem('XTotalWin');
        localStorage.removeItem('OTotalWin');
        window.location.href = '/';

    }

    render() {

        this.resetCountDownTimer();

        const { history } = this.state;
        const current = history[this.state.currentStepNumber];
        const { winner, winnerRow } = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = `Winner ${winner}`;
            this.disableBtn = true;

            document.getElementById("btnQuit").style.display = "none";
            document.getElementById("h4Timer").style.display = "none";

        } else if (history.length === 10) {
            this.disableBtn = true;
            status = 'Match has been drown.';
            localStorage.currentTurn = 'Draw';
            window.location.href = '/winner';

        } else {
            status = `Next turn: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="container">
                <div className="jumbotron">
                    <div className="game">
                        <div className="game-top">
                            <h4 id="h4Timer">Time Left : <strong className="text-red" id="timer"></strong>
                            </h4>
                            <div className="game-info">
                                <div>{status}</div>
                            </div>
                        </div>

                        <div className="game-board">
                            <Board
                                squares={current.squares}
                                winnerSquares={winnerRow}
                                disableBtn={this.disableBtn}
                                onClick={i => this.handleClick(i)}
                            />
                        </div>

                    </div>
                    <h2 id="msgLower" className="time-up" ></h2>
                    <p>
                        <button id="btnQuit" className="btn btn-primary" onClick={() => this.btnQuitClick()} >Quit</button>
                    </p>
                </div>
            </div>
        );
    }
}

export default Game;
