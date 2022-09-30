import React, { Component } from 'react';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      tempUnit: 'C',
      temp: ''
    }
  }
  render() {
    let { fetchedLoc, fetchedCud, fetchedCon} = this.props;
    // this.setState({ temp: fetchedCud.temp_c });
    const toggleSwitch = () => {
      if (this.state.tempUnit === 'C') {
        this.setState({ temp: fetchedCud.temp_f});
        this.setState({ tempUnit: 'F' });
      };
      if (this.state.tempUnit === 'F') {
        this.setState({ temp: fetchedCud.temp_c });
        this.setState({ tempUnit: 'C' });
      };
    };
    return (
      <div className='container'>
        <div className="weather-head">
          <h1 className='weather-heading'>{fetchedLoc.name} Weather Forecast</h1>
          <div className="switch-container">
            <span className='switch-txt cel non-selectable'>°C</span>
            <label className="switch">
              <input type="checkbox" onClick={toggleSwitch} />
              <span className="slider round"></span>
            </label>
            <span className='switch-txt fah non-selectable'>°F</span>
          </div>
        </div>
        <div className="weather">
          <div className="left-wth">
            <img src={fetchedCon.icon} className='con-icon non-selectable' alt="condition icon" />
            <span className='temp'>{this.state.temp===''?fetchedCud.temp_c:this.state.temp}º{this.state.tempUnit}</span>
          </div>
          <div className="right-wth">
            <ul className='details-list'>
              <li>Wind: {fetchedCud.wind_mph}mph</li>
              <li>Precip: {fetchedCud.precip_in} inch</li>
              <li>Pressure: {fetchedCud.pressure_in} inch</li>
            </ul>
            <br className='non-selectable' />
            <span className='con-text'>{fetchedCon.text}</span>
          </div>
        </div>
        <div className="details">
          <div className="left">
            <div className="first">
              <p>Humidity</p>
              <p>{fetchedCud.humidity}%</p>
            </div>
            <br />
            <div className="second">
              <p>Cloud</p>
              <p>{fetchedCud.cloud}</p>
            </div>
          </div>
          <div className="right">
            <div className="first">
              <p>UV Index</p>
              <p>{fetchedCud.uv}</p>
            </div>
            <br />
            <div className="second">
              <p>Gust</p>
              <p>{fetchedCud.gust_mph}mph</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
