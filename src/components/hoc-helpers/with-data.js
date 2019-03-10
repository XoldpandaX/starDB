import React, { Component } from 'react';

import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: false,
      error: false
    };

    async componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        await this.update();
      }
    }
    
    async componentDidMount() {
      await this.update();
    }
    
    update = async () => {
      try {
        this.setState({ loading: true });
        
        const data = await this.props.getData();
        this.setState({ data });
      } catch (e) {
        this.setState({ error: true })
      } finally {
        this.setState({ loading: false })
      }
    };

    render() {
      const { data, loading, error } = this.state;

      if (!data || loading) {
        return <Spinner />;
      }
      
      if (error) {
        return <ErrorIndicator />
      }

      return !data ? <Spinner /> : <View {...this.props} data={data} />;
    }
  };
};

export default withData;
