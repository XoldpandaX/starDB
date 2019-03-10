import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helpers';

const withChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        { fn }
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

const PersonList =
  withSwapiService(mapMethodsToProps('persons'))(
    withData(
      withChildFunction(renderName)(ItemList)
    )
  );

const PlanetList = withSwapiService(mapMethodsToProps('planets'))(
  withData(
    withChildFunction(renderName)(ItemList)
  )
);

const StarshipList = withSwapiService(mapMethodsToProps('starShips'))(
  withData(
    withChildFunction(renderModelAndName)(ItemList)
  )
);

export {
  PersonList,
  PlanetList,
  StarshipList
};
