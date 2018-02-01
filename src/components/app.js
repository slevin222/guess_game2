import 'materialize-css/dist/css/materialize.min.css';
import '../assets/css/app.css';
import React from 'react';
import Game from './game';

const App = () => (
    <div className="container">
        <h1 className="center-align z-depth-3 indigo-text darken-4" >GuessinG Game</h1>
        <Game />
    </div>
);

export default App;
