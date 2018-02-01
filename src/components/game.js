import React, { Component } from 'react';
import '../assets/css/game.css';
import History from './history';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userNumber: '',
            message: '',
            shake: false,
            guesses: 0,
            history: [],
            lowScore: localStorage.getItem('score') || 'Not set'
        }
        this.randomNumber = 0;
        this.status = 'playable';
    }

    componentDidMount() {
        this.generateRandomNumber();
    }

    generateRandomNumber() {
        this.randomNumber = Math.floor(Math.random() * 100) + 1;


    }

    resetGame() {
        this.status = 'playable';
        this.generateRandomNumber();
        this.setState({
            userNumber: '',
            message: '',
            shake: false,
            guesses: 0,
            history: []
        });
    }

    checkHighScore() {
        const highScore = localStorage.getItem('score');
        const { guesses } = this.state;
        if (highScore) {
            if (guesses < highScore) {
                localStorage.setItem("score", guesses);
            }
            return;
        } else {
            localStorage.setItem("score", guesses);
        }
        this.setState({
            lowScore: localStorage.getItem('score')
        });
    }

    makeGuess(event) {
        event.preventDefault();
        if (this.status === 'won') {
            return;
        }
        const { userNumber, guesses, history } = this.state;
        let msg = '';
        let status = 'playable';


        if (this.randomNumber < userNumber) {
            msg = 'Too High!';

        } else if (this.randomNumber > userNumber) {
            msg = 'Too Low!';
        } else {

            msg = 'You guessed it';
            this.status = 'won';
        }
        this.setState({
            message: msg,
            userNumber: '',
            shake: true,
            guesses: guesses + 1,
            history: [`${userNumber} is ${msg}`, ...history]
        }, () => {
            if (this.status === 'won') {
                this.checkHighScore();
            }

        });

        setTimeout(() => {
            this.setState({
                shake: false
            });
        }, 750);
    }

    render() {
        const btnStyle = {
            margin: '10px 5px'
        };

        const { userNumber, message, shake, guesses, lowScore, history } = this.state;
        return (
            < div className="box center-align" >
                <p>Best Score: {lowScore}</p>
                <div className="row">
                    <form className="col s6 offset-s3" onSubmit={this.makeGuess.bind(this)}>
                        <div className="row">
                            <div className="input-field">
                                <input className="center-align" onChange={(event) => { this.setState({ userNumber: event.target.value }) }} value={userNumber} type="number" placeholder="Enter a Number between 1-100" />
                            </div>
                        </div>
                        <div className="row">
                            <button style={btnStyle} className="btn pulse green">Guess</button>
                            <button style={btnStyle} type="button" onClick={this.resetGame.bind(this)} className="btn red">Reset</button>
                        </div>
                        <h4 className="center-align">Number of Guesses: {guesses}</h4>
                        <h3 className={`center-align ${shake ? 'shake' : ''}`}>{message}</h3>
                        <History data={history} />
                    </form>
                </div>
            </div >
        )
    }
}

export default Game;