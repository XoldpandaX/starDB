import React from 'react';
import ItemList from '../item-list';
import {
  compose,
  withChild,
  withData,
  withSwapiService
} from '../hoc-helpers';

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name}) => <span>{name} ({model})</span>;

const mapMethodsToProps = (listType) => {
  const methodsByListType = {
    persons: (swapiService) => ({ getData: swapiService.getAllPeople }),
    planets: (swapiService) => ({ getData: swapiService.getAllPlanets }),
    starShips: (swapiService) => ({ getData: swapiService.getAllStarships })
  };

  return methodsByListType[listType];
};

const PersonList = compose(
  withSwapiService(mapMethodsToProps('persons')),
  withData,
  withChild(renderName)
)(ItemList);

const PlanetList = compose(
  withSwapiService(mapMethodsToProps('planets')),
  withData,
  withChild(renderName)
)(ItemList);

const StarshipList = compose(
  withSwapiService(mapMethodsToProps('starShips')),
  withData,
  withChild(renderModelAndName)
)(ItemList);

export {
  PersonList,
  PlanetList,
  StarshipList
};
