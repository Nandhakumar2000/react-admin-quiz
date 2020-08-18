import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Game = props => (
  <tr>
    <td>{props.game.gameName}</td>
    <td>{props.game.gameType}</td>
    <td>{props.game.startTime}</td>
    <td>{props.game.endTime}</td>
    <td>{props.game.questions.length}</td>
    <td>{props.game.questionTime} (in Seconds)</td>
    <td>
      <Link to={"/Games/"+props.game._id}>View</Link>
    </td>
  </tr>
)

export default class GamesList extends Component {

  constructor(props) {
    super(props);

    this.deleteGame = this.deleteGame.bind(this)

    this.state = {games: []};
  }

  componentDidMount() {
    if(sessionStorage.getItem("signedin") == 'true'){
    }
    else{
      window.location = "/signin";
    }
    axios.get('http://localhost:5000/games/')
      .then(response => {
        this.setState({ games: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteGame(id) {
    axios.delete('http://localhost:5000/games/'+id)
      .then(response => { console.log(response.data)});
    this.setState({
      games: this.state.games.filter(el => el._id !== id)
    })
  }

  gameList() {
    return this.state.games.map(currentgame => {
      return <Game game={currentgame} deletegame={this.deleteGame} key={currentgame._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3 style={{textAlign:"center"}}>Games List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Game Name</th>
              <th>Game Type</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Total Questions</th>
              <th>Question Time</th>
            </tr>
          </thead>
          <tbody>
            { this.gameList() }
          </tbody>
        </table>
        <Link to="/add"><button >
        Create New  Game
       </button></Link>
      </div>
    )
  }
}