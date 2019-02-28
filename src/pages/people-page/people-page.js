import React, { Component } from 'react';

import SwapiService from '../../services/swapi';

import ErrorBoundary from '../../components/error-boundary';
import ItemList from '../../components/item-list';
import Row from '../../components/row';
import PersonDetails from '../../components/person-details';

import './people-page.css';

export default class PeoplePage extends Component {
  swapiService = new SwapiService();
  
  state = {
    selectedPersonId: 3
  };
  
  changeSelectedPerson = (id) => this.setState({ selectedPersonId: id });
  
  render () {
    const { selectedPersonId } = this.state;
    
    const renderPerson = ({ name, gender, birthYear }) => {
      return (
        <p>{ `${ name } (${ gender } ${ birthYear })` }</p>
      );
    };
    
    const itemList = (
      <ItemList
        onPersonSelected={ this.changeSelectedPerson }
        getData={ this.swapiService.getAllPeople }
      >
        { (item) => renderPerson(item) }
      </ItemList>
    );
    
    const personDetails = (
      <ErrorBoundary>
        <PersonDetails personId={ selectedPersonId }/>
      </ErrorBoundary>
    );
  
    return (
      <Row
        leftComponent={ itemList }
        rightComponent={ personDetails }
      />
    );
  }
}
