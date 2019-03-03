import React, { Component } from 'react';

import ErrorBoundary from '../error-boundary';
import Header from '../header';
import HeadlineList from '../headline-list';
import RandomPlanet from '../random-planet';
import Row from '../row';
import PeoplePage from '../../pages/people-page';
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
  render() {
    const personDetails = (
      <PersonDetails itemId={ 11 }>
        <HeadlineList />
      </PersonDetails>
    );
    
    const starShipDetails = (
      <StarShipDetails itemId={ 5 }>
        <HeadlineList />
      </StarShipDetails>
    );
    
    const planetDetails = (
      <PlanetDetails itemId={ 2 }>
        <HeadlineList />
      </PlanetDetails>
    );
    
    return (
      <ErrorBoundary>
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
      </ErrorBoundary>
    );
  }
}
