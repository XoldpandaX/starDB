import React, { Component } from 'react';

import SwapiService from '../../services/swapi';

import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './random-planet.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();
  
  state = {
    planet: null,
    loading: true,
    error: false
  };
  
  async componentDidMount() {
    await this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5000);
  }
  
  onPlanetLoaded = (planet) => this.setState({ planet });
  onError = () => this.setState({ error: true });
  hideLoadingIndicator = () => this.setState({ loading: false });
  
  updatePlanet = async () => {
    try {
      const id = Math.floor(Math.random() * 25 + 3);
      const planet = await this.swapiService.getPlanet(id);
  
      this.onPlanetLoaded(planet);
    } catch (e) {
      this.onError();
      console.error('updatePlanet', e);
    } finally {
      this.hideLoadingIndicator();
    }
  };
  
  render() {
    const { planet, loading, error } = this.state;
    const hasData = !(error || loading);
    
    const spinner = loading ? <Spinner /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    const content = hasData ? <PlanetView planet={ planet }/> : null;
    
    const baseClasses = 'random-planet jumbotron rounded';
    const resultClasses = !hasData
      ? `${ baseClasses } random-planet--loading`
      : baseClasses;
    
    
    return (
      <div className={ resultClasses }>
        { spinner }
        { errorIndicator }
        { content }
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet;
  const imageUrl = id && `https://starwars-visualguide.com/assets/img/planets/${ id }.jpg`;
  
  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={ imageUrl }
        alt='planet'
      />
      <div className='random-planet__info'>
        <h4>{ name }</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{ population }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{ rotationPeriod }</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{ diameter }</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
