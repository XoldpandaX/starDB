export default class SwapiService {
  _apiBaseUrl = 'https://swapi.co/api/';
  
  async getResource(url) {
    const response = await fetch(`${ this._apiBaseUrl }${ url }`);
    
    if (!response.ok) {
      throw new Error(`could not fetch ${ url }, recieved ${ response.status }`);
    }
    
    const res = await response.json();
    
    return res;
  }
  
  _extractId(itemUrl) {
    const idRegExp = /\/([0-9]*)\/$/;
    return itemUrl.match(idRegExp)[1];
  }
  
  _planetMapper(planet) {
    return {
      id: this._extractId(planet.url),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  }
  
  _starShipMapper(starShip) {
    return {
      id: this._extractId(starShip.url),
      name: starShip.name,
      model: starShip.model,
      manufacturer: starShip.manufacturer,
      costInCredits: starShip.costInCredits,
      length: starShip.length,
      crew: starShip.crew,
      passengers: starShip.passengers,
      cargoCapacity: starShip.cargoCapacity
    };
  }
  
  _personMapper(person) {
    return {
      id: this._extractId(person.url),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    };
  }
  
  async getAllPeople() {
    const { results } = await this.getResource('people');
    return results.map((person) => this._personMapper(person));
  }
  
  async getPerson(id) {
    const person = await this.getResource(`people/${ id }`);
    return this._personMapper(person);
  }
  
  async getAllPlanets() {
    const { results } = await this.getResource('planets');
    return results.map((planet) => this._planetMapper(planet));
  }
  
  async getPlanet(id) {
    const planet = await this.getResource(`planets/${ id }`);
    return this._planetMapper(planet);
  }
  
  async getAllStarships() {
    const { results } = await this.getResource('starships');
    return results.map((starship) => this._starShipMapper(starship));
  }
  
  async getStarship(id) {
    const starShip = await this.getResource(`starship/${ id }`);
    return this._starShipMapper(starShip);
  }
}
