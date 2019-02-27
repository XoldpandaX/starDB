import React, { Component } from 'react';

import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import Header from '../header';
import RandomPlanet from '../random-planet';

import PeoplePage from '../../pages/people-page';

import './app.css';


export default class App extends Component {
  state = {
    hasError: false
  };
  
  componentDidCatch(error, info) {
    debugger;
    this.setState({ hasError: true });
  }
  
  render() {
    const { hasError } = this.state;
    
    if (hasError) {
      return <ErrorIndicator />
    }
    
    return (
      <div className='app-container'>
        <Header />
        <RandomPlanet />
        <div className='row mb2'>
          <div className='col-md-6 '>
            <ErrorButton/>
          </div>
        </div>
        <PeoplePage />
        <PeoplePage />
        <PeoplePage />
      </div>
    );
  }
}
