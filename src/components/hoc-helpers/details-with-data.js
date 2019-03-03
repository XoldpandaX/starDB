import React, { Component } from 'react';

import ErrorBoundary from '../error-boundary';
import Spinner from '../spinner';

const detailsWithData = (View, getData, getImage) => {
  return class extends Component {
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
      const { itemId } = this.props;
      
      if (!itemId) {
        return;
      }
      
      await this.fetchItem(itemId, getData);
      this.setState({ image: getImage(itemId) });
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
      const { item, image, loading } = this.state;
      
      const hasContent = !loading && item !== null;
      const baseClasses = 'item-details card';
      const resultClasses = loading ? `${ baseClasses } item-details--loading` : baseClasses;
      const spinner = loading ? <Spinner /> : null;
      const notSelectedMsg = !item && !loading && <span>Select an item from a list</span>;
      
      const content = hasContent ?
        <View
          item={ item }
          imageUrl={ image }
          classes={ resultClasses }
          { ...this.props }
        />
        : null;
      
      
      return (
        <React.Fragment>
          { spinner }
          { notSelectedMsg }
          <ErrorBoundary>
            { content }
          </ErrorBoundary>
        </React.Fragment>
      );
    }
  };
};

export default detailsWithData;
