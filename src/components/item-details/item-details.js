import React, { Component } from 'react';

import ErrorButton from '../error-button';
import HeadlineList from '../headline-list';
import Spinner from '../spinner';

import './item-details.css';

export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null,
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
    const { itemId, getData, getImageUrl } = this.props;
    
    if (!itemId) {
      return;
    }
    
    await this.fetchItem(itemId, getData);
    this.setState({ image: getImageUrl(itemId) });
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
  
  itemView = (item, imageUrl) => {
    const { name: title } = item;
  
    return (
      <React.Fragment>
        <img
          className="item-image"
          src={ imageUrl }
          alt='item'
        />
      
        <div className="card-body">
          {
            React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item, title });
            })
          }
          <ErrorButton />
        </div>
      </React.Fragment>
    )
  };
  
  render() {
    const { item, image, loading } = this.state;
    const hasContent = !loading && item !== null;
  
    const spinner = loading ? <Spinner /> : null;
    const notSelectedMsg = !item && !loading && <span>Select an item from a list</span>;
    const content = hasContent ? this.itemView(item, image) : null;
    
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

