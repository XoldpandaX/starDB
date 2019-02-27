import React, { Component } from 'react';

import ErrorButton from '../error-button';
import Header from '../header';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import RandomPlanet from '../random-planet';

import './app.css';

export default class App extends Component {
  state = {
    selectedPersonId: null
  };
  
  changeSelectedPerson = (id) => this.setState({ selectedPersonId: id });
  
  render() {
    const { selectedPersonId } = this.state;
    
    return (
      <div className='app-container'>
        <Header />
        <RandomPlanet />
        <div className='row mb2'>
          <div className='col-md-6 '>
            <ErrorButton />
          </div>
        </div>
        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onPersonSelected={ this.changeSelectedPerson } />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={ selectedPersonId }/>
          </div>
        </div>
      </div>
    );
  }
}
