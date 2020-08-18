import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Popup from 'reactjs-popup';

const Question = props => (
    <tr>
      <td>{props.question.question}</td>
      <td>{props.question.answer}</td>
      <td>{props.question.shuffledAnswer}</td>
      <td>{props.question.image}</td>

      <td>
      <a href="#">edit</a> | <a href="#" onClick={() => { props.deleteGame(props.question._id) }}>delete</a>
      </td>
    </tr>
  )


export default class Game extends Component {
  constructor(props) {
    super(props);

    this.deleteGame = this.deleteGame.bind(this)

    this.state = { 
    _id: '',
    gameName: '',
    gameBanner: '',
    questionTime: '',
    grandPriceImage: '',
    gameType: '',
    startTime: '',
    endTime: '',
    questions:[],
    question: '',
    answer: '',
    shuffledAnswer:'',
    image:'',
    index: '',
    op: '',
    modalOpen: false
};
this.onChangeanswer = this.onChangeanswer.bind(this);
this.onChangeimage = this.onChangeimage.bind(this);
this.onChangeshuffledAnswer = this.onChangeshuffledAnswer.bind(this);
this.onChangequestion = this.onChangequestion.bind(this);
this.onSubmit = this.onSubmit.bind(this);
this.openModal = this.openModal.bind(this);
this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/games/' +this.props.match.params.id)
      .then(response => {
        this.setState({ 
             _id: response.data._id,
            gameName: response.data.gameName,
            gameBanner: response.data.gameBanner,
            questionTime: response.data.questionTime,
            grandPriceImage: response.data.grandPriceImage,
            gameType: response.data.gameType,
            startTime: response.data.startTime,
            endTime: response.data.endTime,
        questions:response.data.questions })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangequestion(e) {
    this.setState({
        question: e.target.value
    })
  }
  onChangeanswer(e) {
    this.setState({
        answer: e.target.value
    })
  }
  onChangeshuffledAnswer(e) {
    this.setState({
        shuffledAnswer: e.target.value
    })
  }

  onChangeimage(e) {
    this.setState({
        image: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.op != 'add'){
        var ques = this.state.questions;
        ques[this.state.index].question = this.state.question;
        ques[this.state.index].answer = this.state.answer.toUpperCase();
        ques[this.state.index].shuffledAnswer = this.state.shuffledAnswer.toUpperCase();
        ques[this.state.index].image = this.state.image;
        const game = {
            gameName: this.state.gameName,
            gameBanner: this.state.gameBanner,
            questionTime: this.state.questionTime,
            grandPriceImage: this.state.grandPriceImage,
            gameType: this.state.gameType,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            questions:ques
        }
        console.log(game);

    axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data));
   this.closeModal();
    }
    else{
        const des = {
            "question" : this.state.question,
            "answer": this.state.answer.toUpperCase(),
            "image": this.state.image,
            "shuffledAnswer": this.state.shuffledAnswer.toUpperCase()
        }
        var joined = this.state.questions.concat(des);
        const game = {
            gameName: this.state.gameName,
            gameBanner: this.state.gameBanner,
            questionTime: this.state.questionTime,
            grandPriceImage: this.state.grandPriceImage,
            gameType: this.state.gameType,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            questions:joined
        }
        console.log(game);

    axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data));
   this.closeModal();
    }
    
  }

  openModal(op,index,question,answer,shuffledAnswer,image) {
    this.setState({ modalOpen: true,
    index:op,
    op: op
 });
    if(this.state.index != 'add'){
     this.setState({
         question: question,
         answer: answer,
         shuffledAnswer: shuffledAnswer,
         image: image,
         index: index,
         op: op
     })
    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  deleteGame(id) {
    axios.delete('http://localhost:5000/games/'+id)
      .then(response => { console.log(response.data)});
     window.location = "/";
  }

  deleteQuestion(index){
  var joined = this.state.questions.splice(index,1);
  const game = {
      gameName: this.state.gameName,
      gameBanner: this.state.gameBanner,
      questionTime: this.state.questionTime,
      grandPriceImage: this.state.grandPriceImage,
      gameType: this.state.gameType,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      questions:joined
  }
  console.log(index);
  console.log(game);

axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
.then();
  }

  questionList(){
   return this.state.questions.map((currentquestion, i) => {
        return  <tr>
        <td>{currentquestion.question}</td>
        <td>{currentquestion.answer}</td>
        <td>{currentquestion.shuffledAnswer}</td>
        <td>{currentquestion.image}</td>
        <td>
        <a href="#" onClick={() => this.openModal("edit",i,currentquestion.question,currentquestion.answer,currentquestion.shuffledAnswer,currentquestion.image)} >edit</a> | <a href="#" onClick={() => this.deleteQuestion(i)}>delete</a>
        </td>
      </tr>;
      })
  }

  gameList() {
      return  <tr>
      <td>{this.state.gameName}</td>
      <td>{this.state.gameType}</td>
      <td>{this.state.startTime}</td>
      <td>{this.state.endTime}</td>
      <td>{this.state.questions.length}</td>
      <td>{this.state.questionTime} (in Seconds)</td>
      <td>
        <Link to = {"/editgame/" + this.state._id} >edit</Link> | <a href="#" onClick={() => this.deleteGame(this.state._id)}>delete</a>
      </td>
    </tr> ;
  }

  render() {
    return (
      <div>
        <h3 style={{textAlign:"center"}}>{this.state.gameName}</h3>
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
         <br/><br/>
         <h3 style={{textAlign:"center"}}>Questions</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Suffled Answer</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
           {this.questionList()}
          </tbody>
        </table>
        <button onClick={() => this.openModal("add",'','','','')}> Add Question</button>
        <Popup open={this.state.modalOpen} position="right center" modal onClose={this.closeModal}>
        <div>
      <h3 style={{textAlign:"center"}}> Add Question</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Question: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.question}
              onChange={this.onChangequestion}
              />
        </div>
        <div className="form-group"> 
          <label>Answer: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.answer}
              onChange={this.onChangeanswer}
              />
        </div>
        <div className="form-group"> 
          <label>ShuffledAnswer: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.shuffledAnswer}
              onChange={this.onChangeshuffledAnswer}
              />
        </div>
        <div className="form-group"> 
          <label>Image: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.image}
              onChange={this.onChangeimage}
              />
        </div>
        <div className="form-group align-center">
          <input type="submit" value="Add" className="btn btn-primary" />
        </div>
        </form>
        </div>
        </Popup>
      </div>
    )
  }
}