import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { SwapiServiceProvider } from '../swapi-service-context';

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';

import './app.css';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    swapiService: new DummySwapiService()
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };
  
  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService
        ? DummySwapiService
        : SwapiService;
      
      return {
        swapiService: new Service()
      }
    });
  };

  render() {
    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={ this.state.swapiService } >
          <div className="stardb-app">
            <Header onServiceChange={ this.onServiceChange } />
            { planet }

            <PersonDetails itemId={2} />
            <PlanetDetails itemId={2} />
            <StarshipDetails itemId={5} />
            
            <PersonList />
            <StarshipList />
            <PlanetList />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
