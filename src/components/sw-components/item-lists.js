import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helpers';

const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  };
};

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

const PersonList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapMethodsToProps('persons')
);

const PlanetList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapMethodsToProps('planets')
);

const StarshipList = withSwapiService(
  withData(withChildFunction(ItemList, renderModelAndName)),
  mapMethodsToProps('starShips')
);

export {
  PersonList,
  PlanetList,
  StarshipList
};
