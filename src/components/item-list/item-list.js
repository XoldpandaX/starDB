import React, { Component } from 'react';

import SwapiService from '../../services/swapi';

import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {
  swapiService = new SwapiService();
  
  state = {
    persons: null,
    loading: true
  };
  
  async componentDidMount() {
    await this.fetchPersons();
  }
  
  fetchPersons = async () => {
    try {
      const persons = await this.swapiService.getAllPeople();
      
      this.setPersons(persons);
    } catch (e) {
      console.error('fetchPersons', e);
    } finally {
      this.hideLoadingIndicator()
    }
  };
  
  setPersons = (persons) => this.setState({ persons });
  hideLoadingIndicator = () => this.setState({ loading: false });
  
  render() {
    const { persons, loading } = this.state;
    const { onPersonSelected } = this.props;
    
    const personsElements = () => {
      return persons.map(({ id, name }) => {
        return (
          <li
            className='list-group-item'
            key={ id }
            onClick={ () => onPersonSelected(id) }
          >
            <p>{ `name: ${ name }` }</p>
          </li>
        );
      })
    };
    
    const elements = !loading ? personsElements() : null;
    const loadingIndicator = loading ? <Spinner /> : null;
    
    return (
      <ul className="item-list list-group">
        { loadingIndicator }
        { elements }
      </ul>
    );
  }
}
