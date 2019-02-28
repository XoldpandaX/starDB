import React, { Component } from 'react';

import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {
  
  state = {
    persons: null,
    loading: true
  };
  
  async componentDidMount() {
    const { getData } = this.props;
    await this.fetchItems(getData);
  }
  
  fetchItems = async (fetchMethod) => {
    try {
      const persons = await fetchMethod();
      
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
    const { children } = this.props;
    
    const itemElements = () => {
      return persons.map((item) => {
        const { id } = item;
        const value = children(item);
        
        return (
          <li
            className='list-group-item'
            key={ id }
            onClick={ () => onPersonSelected(id) }
          >
            <div>{ value }</div>
          </li>
        );
      })
    };
    
    const elements = !loading ? itemElements() : null;
    const loadingIndicator = loading ? <Spinner /> : null;
    
    return (
      <ul className="item-list list-group">
        { loadingIndicator }
        { elements }
      </ul>
    );
  }
}
