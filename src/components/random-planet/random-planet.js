import React, { Component } from 'react';

import SwapiService from '../../services/swapi';

import './random-planet.css';

export default class RandomPlanet extends Component {
  
  swapiService = new SwapiService();
  
  state = {
    id: null,
    name: null,
    population: null,
    rotationPeriod: null,
    diameter: null
  };
  
  constructor() {
    super();
    this.updatePlanet();
  }
  
  onPlanetLoaded = (planet) => this.setState({ ...planet });
  
  async updatePlanet() {
    const id = Math.floor(Math.random() * 25 + 2);
    const planet = await this.swapiService.getPlanet(id);
    
    this.onPlanetLoaded(planet);
  }
  
  render() {
    const {
      id,
      name,
      population,
      rotationPeriod,
      diameter
    } = this.state;
    
    const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${ id }.jpg`;
    
    return (
      <div className="random-planet jumbotron rounded">
        <img
          className="planet-image"
          src={ imageUrl }
          alt='planet'/>
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
      </div>
    
    );
  }
}
