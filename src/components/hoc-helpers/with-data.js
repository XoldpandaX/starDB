import React, { Component } from 'react';
import Spinner from '../spinner';

const withData = (View, getData) => {
  return class extends Component {
    state = {
      items: null,
      loading: true
    };
    
    async componentDidMount() {
      await this.fetchItems(getData);
    }
    
    fetchItems = async (fetchMethod) => {
      try {
        const items = await fetchMethod();
        
        this.setItems(items);
      } catch (e) {
        console.error('fetchItems', e);
      } finally {
        this.hideLoadingIndicator()
      }
    };
  
    setItems = (items) => this.setState({ items });
    hideLoadingIndicator = () => this.setState({ loading: false });
    
    render () {
      const { loading, items } = this.state;
      
      const itemList = !loading ? <View { ...this.props } items={ items } /> : null;
      const loadingIndicator = loading ? <Spinner /> : null;
      
      return (
        <React.Fragment>
          { itemList }
          { loadingIndicator }
        </React.Fragment>
      );
    }
  };
};

export default withData;
