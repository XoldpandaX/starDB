import React, { Component } from 'react';

import SwapiService from '../../services/swapi';

import ErrorButton from '../error-button';
import Spinner from '../spinner';

import './person-details.css';

export default class PersonDetails extends Component {
  swapiService = new SwapiService();
  
  state = {
    person: null,
    loading: false
  };
  
  async componentDidMount() {
    await this.updatePerson();
  }
  
  async componentDidUpdate(prevProps) {
    const { personId } = this.props;
    
    if (personId !== prevProps.personId) {
      await this.updatePerson(personId);
    }
  }
  
  updatePerson = async () => {
    const { personId } = this.props;
    
    if (!personId) {
      return;
    }
    await this.fetchPerson(personId);
  };
  
  fetchPerson = async (id) => {
    try {
      this.showLoadingIndicator();
      
      const person = await this.swapiService.getPerson(id);
      
      this.setPerson(person);
    } catch (e) {
      console.error('fetchPerson', e);
    } finally {
      this.hideLoadingIndicator();
    }
  };
  
  setPerson = (person) => this.setState({ person });
  hideLoadingIndicator = () => this.setState({ loading: false });
  showLoadingIndicator = () => this.setState({ loading: true });
  
  render() {
    const { person, loading } = this.state;
    const hasContent = !loading && person !== null;
    
    const notSelectedMsg = !person && !loading && <span>Select a person from a list</span>;
    const content = hasContent ? <PersonView person={ person } /> : null;
    const spinner = loading ? <Spinner /> : null;
    
    const baseClasses = 'person-details card';
    const resultClasses = loading ? `${ baseClasses } person-details--loading` : baseClasses;
    
    return (
      <div className={ resultClasses }>
        { spinner }
        { notSelectedMsg }
        { content }
      </div>
    )
  }
}

const PersonView = ({ person}) => {
  const { id, name, gender, birthYear, eyeColor } = person;
  const imageUrl = id && `https://starwars-visualguide.com/assets/img/characters/${ id }.jpg`;
  
  return (
    <React.Fragment>
      <img
        className="person-image"
        src={ imageUrl }
        alt='person'
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
