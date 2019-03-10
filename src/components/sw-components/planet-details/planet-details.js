import React from 'react';

import ItemDetails, { Record } from '../../item-details';

import { withSwapiService } from '../../hoc-helpers';

const records = {
  planet: [
    {
      id: 1,
      field: 'population',
      label: 'Population'
    },
    {
      id: 2,
      field: 'rotationPeriod',
      label: 'Rotation Period'
    },
    {
      id: 3,
      field: 'diameter',
      label: 'Diameter'
    }
  ]
};

const renderRecord = (recordField) => {
  return recordField.map(({ id, ...props }) => <Record key={ id } {...props} />)
};

const mapMethodsToProps = (swapiService) => ({
  getData: swapiService.getPlanet,
  getImageUrl: swapiService.getPlanetImage
});

const PlanetDetails = (props) => {
  const { planet } = records;
  
  return (
    <ItemDetails { ...props } >
      { renderRecord(planet) }
    </ItemDetails>
  );
};

export default withSwapiService(PlanetDetails, mapMethodsToProps);
