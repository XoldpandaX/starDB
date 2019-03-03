import React from 'react';

import ItemList from '../item-list';
import { withData } from '../hoc-helpers';

import SwapiService from '../../services/swapi';

const {
  getAllPeople,
  getAllStarShips,
  getAllPlanets,
} = new SwapiService();

const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped { ...props }>
        { fn }
      </Wrapped>
    );
  };
};

const personChildren = ({ name, gender, birthYear }) => {
  return <p>{ `${ name } (${ gender }: ${ birthYear })` }</p>;
};

const starShipChildren = ({ name, model, crew }) => {
  return <p>{ `${ name } (${ model }: ${ crew })` }</p>;
};

const planetChildren = ({ name, population }) => {
  return (
    <React.Fragment>
      <p>
        <b>{ `name: ` }</b>
        <i>{ `${ name }` }</i>
      </p>
      <p>
        <b>{ `population: ` }</b>
        <i>{ `${ population }` }</i>
      </p>
    </React.Fragment>
  );
};

const PersonList = withData(withChildFunction(ItemList, personChildren), getAllPeople);
const StarShipList = withData(withChildFunction(ItemList, starShipChildren), getAllStarShips);
const PlanetList = withData(withChildFunction(ItemList, planetChildren), getAllPlanets);

export {
  PersonList,
  StarShipList,
  PlanetList
};
