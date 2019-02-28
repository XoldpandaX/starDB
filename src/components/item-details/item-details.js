import React, { Component } from 'react';

import ErrorButton from '../error-button';
import Spinner from '../spinner';

import './item-details.css';

export default class ItemDetails extends Component {
  state = {
    item: null,
    loading: false
  };
  
  async componentDidMount() {
    await this.updateItem();
  }
  
  async componentDidUpdate(prevProps) {
    const { itemId } = this.props;
    
    if (itemId !== prevProps.itemId) {
      await this.updateItem(itemId);
    }
  }
  
  updateItem = async () => {
    const { itemId, getData } = this.props;
    
    if (!itemId) {
      return;
    }
    
    await this.fetchItem(itemId, getData);
  };
  
  fetchItem = async (id, fetchMethod) => {
    try {
      this.showLoadingIndicator();
      
      const item = await fetchMethod(id);
      
      this.setItem(item);
    } catch (e) {
      console.error('fetchItem', e);
    } finally {
      this.hideLoadingIndicator();
    }
  };
  
  setItem = (item) => this.setState({ item });
  hideLoadingIndicator = () => this.setState({ loading: false });
  showLoadingIndicator = () => this.setState({ loading: true });
  
  render() {
    const { item, loading } = this.state;
    const hasContent = !loading && item !== null;
    
    const notSelectedMsg = !item && !loading && <span>Select an item from a list</span>;
    const content = hasContent ? <ItemView item={ item } /> : null;
    const spinner = loading ? <Spinner /> : null;
    
    const baseClasses = 'item-details card';
    const resultClasses = loading ? `${ baseClasses } item-details--loading` : baseClasses;
    
    return (
      <div className={ resultClasses }>
        { spinner }
        { notSelectedMsg }
        { content }
      </div>
    )
  }
}

const ItemView = ({ item }) => {
  const { id, name, gender, birthYear, eyeColor } = item;
  const imageUrl = id && `https://starwars-visualguide.com/assets/img/characters/${ id }.jpg`;
  
  return (
    <React.Fragment>
      <img
        className="item-image"
        src={ imageUrl }
        alt='item'
      />
  
      <div className="card-body">
        <h4>{ name }</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{ gender }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{ birthYear }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{ eyeColor }</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </React.Fragment>
  );
};
