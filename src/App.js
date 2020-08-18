import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import GamesList from './components/games.component';
import Game from './components/game.component';
import CreateGame from './components/addGame.component';
import EditGame from './components/editGame.component';
import GoogleBtn from './components/google-sign-in.component';


function App() {
  return (
    <Router>
      <div className="container">
   
      <br/>
      <Route path="/" exact component={GamesList} />
      <Route path="/games/:id" component={Game} />
      <Route path="/add" component={CreateGame} />
      <Route path="/editgame/:id" component={EditGame} />
      <Route path="/signin" component={GoogleBtn} />
      </div>
    </Router>
  );
}

export default App;