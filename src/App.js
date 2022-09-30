import React, { Component } from 'react';
import './App.css';
import './Utils.css'
import './Alert.css';
import Alert from './components/Alert';
import Footer from './components/Footer';
import Main from './components/Main';
import NavbarIcon from './Images/NavbarIcon.png';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
      locationData: '',
      currentData: '',
      conditionData: '',
      sch_place: '',
      alert: null,
      toShowAlert: false
    }
  }
  delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  showAlert = (type, message, icon) => {
    this.setState({ alert: [type, message, icon], toShowAlert: true })
    this.delay(2000).then(() => this.setState({ toShowAlert: false }));
  }
  fetchWeather = async (place='auto:ip') => {
    let url = `https://api.weatherapi.com/v1/current.json?key=815f3afefbe1460790853704220302&q=${place}&aqi=no`;
    let response = await fetch(url);
    let data = await response.json();
    if (data.location === undefined) {
      this.showAlert("danger", "Please enter a valid city name", "exclamation-triangle-fill")
    }
    else {
      this.setState({ data: data })
      this.setState({ locationData: data.location });
      this.setState({ currentData: data.current });
      this.setState({ conditionData: data.current.condition });
      this.showAlert("success", "The weather is fetched successfuly", "check-circle-fill")
    }
  }
  componentDidMount() {
    this.fetchWeather();
  }
  handleOnChange = (event) => {
    this.setState({ sch_place: event.target.value });
  }
  search = () => {
    if (this.state.sch_place !== '') {
      this.fetchWeather(this.state.sch_place);
    }
  }
  render() {
    return (
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <img src={NavbarIcon} alt="Navbar Icon" className='navbar-icon non-selectable' />
          <a href="/" className="nav-head non-selectable"><span>WeatherBaba</span></a>
          <div className="right-txt">
            <input type="text" className='search-textbox' placeholder='Search Weather of a place' value={this.state.sch_place} onChange={this.handleOnChange} />
            <button className='search-btn non-selectable' onClick={this.search}>Search</button>
          </div>
        </nav>
        {this.state.toShowAlert ? <Alert alertProp={this.state.alert} /> : ""}
        <Main fetchedLoc={this.state.locationData} fetchedCud={this.state.currentData} fetchedCon={this.state.conditionData} />
        <Footer />
      </div>
    );
  }
}
