import React from 'react';

function Welcome() {
    return (
        <div className="container">

            <div class="jumbotron">
                <h1 class="display-4">Tic Tac Toe !</h1>
                <p class="lead">Tic Tac toe  requires two players to play this game and both players has to play on the same device. Click on START GAME once both players are ready.  </p>
                <p class="lead">
                    <a href="/players" class="btn btn-success btn-lg" role="button">Start Game</a>
                </p>
            </div>
        </div>
    );
}

export default Welcome