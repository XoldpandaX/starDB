import React, { Component } from 'react';

import ErrorIndicator from '../../components/error-indicator';
import ItemList from '../../components/item-list';
import PersonDetails from '../../components/person-details';

import './people-page.css';

export default class PeoplePage extends Component {
  state = {
    selectedPersonId: 3,
    hasError: false
  };
  
  componentDidCatch () {
    this.setState({ hasError: true });
  }
  
  changeSelectedPerson = (id) => this.setState({ selectedPersonId: id });
  
  render () {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    
    const { selectedPersonId } = this.state;
    
    return (
      <div className="people-page row mb2">
        <div className="col-md-6">
          <ItemList onPersonSelected={ this.changeSelectedPerson } />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={ selectedPersonId }/>
        </div>
      </div>
    );
  }
}
