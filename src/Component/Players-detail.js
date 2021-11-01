import React from 'react'


function PlayersDetail() {
    return (
        <div>

            <div className="container">
                <div className="jumbotron">

                    <div className="row align-items-center justify-content-center">

                        <div className="col-md-4">
                            <div class="shadow-lg p-3 mb-5 bg-white rounded">
                                <div className="row">
                                    <div className="col-md-6">
                                        Player 1
                                </div>
                                    <div className="col-md-6 text-right">
                                        <strong> X</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div class="shadow-lg p-3 mb-5 bg-white rounded">

                                <div className="row">
                                    <div className="col-md-6">
                                        Player 2
                                </div>
                                    <div className="col-md-6 text-right">
                                        <strong> O</strong>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div>
                        <a href="/game" className="btn btn-lg btn-success">Continue</a>                        
                    </div>

                </div>



            </div>



        </div>
    )
}

export default PlayersDetail