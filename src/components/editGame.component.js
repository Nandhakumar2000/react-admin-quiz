import React, { Component } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import InputColor from 'react-input-color';

export default class EditGame extends Component {
  constructor(props) {
    super(props);

    this.onChangegameName = this.onChangegameName.bind(this);
    this.onChangegameType = this.onChangegameType.bind(this);
    this.onChangequestionTime = this.onChangequestionTime.bind(this);
    this.onChangegameBanner = this.onChangegameBanner.bind(this);
    this.onChangegrandPriceImage = this.onChangegrandPriceImage.bind(this);
    this.onChangegradientColor1 = this.onChangegradientColor1.bind(this);
    this.onChangegradientColor2 = this.onChangegradientColor2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        gameName: '',
        gameBanner: '',
        questionTime: '',
        grandPriceImage: '',
        gameType: '',
        startTime: '',
        endTime: '',
        questions:[],
        gradientColor1 :'',
        gradientColor2: ''
    }
  }

  componentDidMount() {
    
    axios.get('http://localhost:5000/games/'  +this.props.match.params.id)
    .then(response => {
        console.log(response.data.gameName);
      this.setState({ 
           _id: response.data._id,
          gameName: response.data.gameName,
          gameBanner: response.data.gameBanner,
          questionTime: response.data.questionTime,
          grandPriceImage: response.data.grandPriceImage,
          gameType: response.data.gameType,
          startTime: response.data.startTime,
          endTime: response.data.endTime,
          gradientColor1: response.data.gradientColor1,
          gradientColor2: response.data.gradientColor2,
      questions:response.data.questions })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onChangegameName(e) {
    this.setState({
      gameName: e.target.value
    })
  }

  onChangegrandPriceImage(e) {
    this.setState({
        grandPriceImage: e.target.value
    })
  }
  onChangegameBanner(e) {
    this.setState({
      gameBanner: e.target.value
    })
  }
  onChangegameType(e) {
    this.setState({
        gameType: e.target.value
    })
  }

  onChangequestionTime(e) {
    this.setState({
        questionTime: e.target.value
    })
  }

  onChangegradientColor1(val){
    this.setState({
      gradientColor1: val
    })
  }

  onChangegradientColor2(val){
    this.setState({
     gradientColor2: val
    })
  }

  onChangestartTime  = date => this.setState({ startTime:date })
  onChangeendTime  = date => this.setState({ endTime:date })
  onSubmit(e) {
    e.preventDefault();

    const game = {
        gameName: this.state.gameName,
        gameBanner: this.state.gameBanner,
        questionTime: this.state.questionTime,
        grandPriceImage: this.state.grandPriceImage,
        gameType: this.state.gameType,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        gradientColor1: this.state.gradientColor1,
        gradientColor2: this.state.gradientColor2,
        questions:this.state.questions,
    }

    console.log(game);

    axios.post('http://localhost:5000/games/update/' + this.props.match.params.id, game)
      .then(res => console.log(res.data));

      window.location = '/Games/' + this.props.match.params.id;

  }

  render() {
    return (
    <div>
      <h3 style={{textAlign:"center"}}> Edit Game</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Game Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.gameName}
              onChange={this.onChangegameName}
              />
        </div>
        <div className="form-group"> 
          <label>Game Banner: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.gameBanner}
              onChange={this.onChangegameBanner}
              />
        </div>
        <div className="form-group"> 
          <label>Grand Price Image: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.grandPriceImage}
              onChange={this.onChangegrandPriceImage}
              />
        </div>
        <div className="form-group"> 
          <label>Game Type: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.gameType}
              onChange={this.onChangegameType}
              />
        </div>
        <div className="form-group">
          <label>Duration (in seconds): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.questionTime}
              onChange={this.onChangequestionTime}
              />
        </div>
        <div className="form-group">
          <label>Gradient Color 1: </label>
          <input type="color" value={this.state.gradientColor1} onChange={e => this.onChangegradientColor1(e.target.value)} />

        </div>
        <div className="form-group">
          <label>Gradient Color 2: </label>
          <input type="color" value={this.state.gradientColor2} onChange={e => this.onChangegradientColor2(e.target.value)} />
        </div>
        <div className="form-group">
        <label>Start Time: </label><br/>
        <DateTimePicker
          onChange={this.onChangestartTime}
          value={this.state.startTime}
        /></div>
        <div className="form-group">
        <label>End Time: </label><br/>
        <DateTimePicker
          onChange={this.onChangeendTime}
          value={this.state.endTime}
        /></div>
        <div className="form-group">
          <input type="submit" value="Create Game" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}