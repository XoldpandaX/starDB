import React, { Component } from 'react';

import { SwapiServiceProvider } from '../swapi-service-context';
import SwapiService from '../../services/swapi';

import ErrorBoundary from '../error-boundary';
import Header from '../header';
import Record from '../record';
import RandomPlanet from '../random-planet';
import Row from '../row';
import {
  PersonList,
  StarShipList,
  PlanetList,
  PersonDetails,
  StarShipDetails,
  PlanetDetails
} from '../sw-components';

import './app.css';

export default class App extends Component {
  swapiService = new SwapiService();
  
  render() {
    const personDetails = (
      <PersonDetails itemId={ 11 }>
        <Record
          field='gender'
          label='Gender'
        />
        <Record
          field='eyeColor'
          label='Eye Color'
        />
      </PersonDetails>
    );
    
    const starShipDetails = (
      <StarShipDetails itemId={ 5 }>
        <Record
          field='model'
          label='Model'
        />
        <Record
          field='length'
          label='Length'
        />
        <Record
          field='name'
          label='Name'
        />
      </StarShipDetails>
    );
    
    const planetDetails = (
      <PlanetDetails itemId={ 2 }>
        <Record
          field='name'
          label='Name'
        />
        <Record
          field='population'
          label='Population'
        />
      </PlanetDetails>
    );
    
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={ this.swapiService }>
          <div className='app-container'>
            <Header />
            <RandomPlanet />
            <Row
              leftComponent={ <PersonList /> }
              rightComponent={ personDetails }
            />
            <Row
              leftComponent={ <StarShipList /> }
              rightComponent={ starShipDetails }
            />
            <Row
              leftComponent={ <PlanetList /> }
              rightComponent={ planetDetails }
            />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
