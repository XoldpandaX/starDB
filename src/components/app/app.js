import React, { Component } from 'react';

import SwapiService from '../../services/swapi';

import ItemList from '../item-list';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../../pages/people-page';

import './app.css';


export default class App extends Component {
  swapiService = new SwapiService();
  
  state = {
    hasError: false
  };
  
  componentDidCatch(error, info) {
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
        <div className="people-page row mt-5">
          <div className="col-md-6">
            <ItemList
              onPersonSelected={ this.changeSelectedPerson }
              getData={ this.swapiService.getAllPlanets }
            >
              { (item) => `PLANET: ${ item.name }` }
            </ItemList>
          </div>
        </div>
        <div className="people-page row mt-5">
          <div className="col-md-6">
            <ItemList
              onPersonSelected={ this.changeSelectedPerson }
              getData={ this.swapiService.getAllStarships }
            >
              { (item) => `STARSHIP: ${ item.name }` }
            </ItemList>
          </div>
        </div>
      </div>
    );
  }
}
