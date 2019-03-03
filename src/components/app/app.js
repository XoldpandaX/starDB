import React, { Component } from 'react';

import SwapiService from '../../services/swapi';

import ErrorBoundary from '../error-boundary';
import ErrorButton from '../error-button';
import ItemDetails from '../item-details';
import ItemList from '../item-list';
import Header from '../header';
import HeadlineList from '../headline-list';
import RandomPlanet from '../random-planet';
import Row from '../row';
import PeoplePage from '../../pages/people-page';

import './app.css';


export default class App extends Component {
  swapiService = new SwapiService();
  
  render() {
    const personsList = (
      <ItemList getData={ this.swapiService.getAllPeople }>
        {
          ({ name, gender, birthYear }) => {
            return <p>{ `${ name } (${ gender }: ${ birthYear })` }</p>;
          }
        }
      </ItemList>
    );
    
    const {
      getPerson,
      getPersonImage,
      getStarShip,
      getStarShipImage
    } = this.swapiService;
    
    const personDetails = (
      <ItemDetails
        getData={ getPerson }
        getImageUrl={ getPersonImage }
        itemId={ 11 }
      >
        <HeadlineList />
      </ItemDetails>
    );
    
    const starShipDetails = (
      <ItemDetails
        getData={ getStarShip }
        getImageUrl={ getStarShipImage }
        itemId={ 5 }
      >
        <HeadlineList />
      </ItemDetails>
    );
    
    return (
      <ErrorBoundary>
        <div className='app-container'>
          <Header />
          <RandomPlanet />
          <Row
            leftComponent={ personsList }
            rightComponent={ personDetails }
          />
        </div>
      </ErrorBoundary>
    );
  }
}
