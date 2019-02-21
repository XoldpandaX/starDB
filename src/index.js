class SwapiService {
  _apiBaseUrl = 'https://swapi.co/api/';
  
  async getResource(url) {
    const response = await fetch(`${ this._apiBaseUrl }${ url }`);
  
    if (!response.ok) {
      throw new Error(`could not fetch ${ url }, recieved ${ response.status }`);
    }
  
    const res = await response.json();
  
    return res;
  }
  
  getAllPeople() {
    return this.getResource('people');
  }
  
  getPerson(id) {
    return this.getResource(`people/${ id }`);
  }
  
  getAllPlanets() {
    return this.getResource('planets');
  }
  
  getPlanet(id) {
    return this.getResource(`planet/${ id }`);
  }
  
  getAllStarships() {
    return this.getResource('starships');
  }
  
  getStarship(id) {
    return this.getResource(`starship/${ id }`);
  }
}


const swapi = new SwapiService();

const fetchPersonData = async (id) => {
  try {
    console.info('loading...');
    const data = await swapi.getPerson(id);
    console.info('loaded');
    console.info(data);
  } catch (e) {
    console.error('getStarWarsPerson', e);
  }
};

const fetchAllPeople = async () => {
  try {
    const { results } = await swapi.getAllPeople();
    console.info(results);
  } catch (e) {
    console.error('fetchAllPeople', e);
  }
};

fetchAllPeople();
fetchPersonData(2);
