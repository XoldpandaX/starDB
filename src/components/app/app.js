import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ErrorBoundry from '../error-boundry';
import Header from '../header';
import RandomPlanet from '../random-planet';
import { StarshipDetails } from '../sw-components';

import { PeoplePage, PlanetsPage, StarShipPage } from '../pages';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

export default class App extends Component {
  state = {
    swapiService: new SwapiService()
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
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={ this.state.swapiService } >
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={ this.onServiceChange } />
              <RandomPlanet />
              <Route
                path='/'
                render={ () => <h2>Welcome To StarDB</h2> }
                exact
              />
              <Route
                path='/people/:id?'
                component={ PeoplePage }
              />
              <Route
                path='/planets'
                component={ PlanetsPage }
              />
              <Route
                path='/star-ships'
                component={ StarShipPage }
                exact
              />
              <Route
                path='/star-ships/:id'
                render={({ match }) => {
                  const { id } = match.params;
                  return <StarshipDetails itemId={ id }/>
                }}
              />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
