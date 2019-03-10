import React from 'react';

import ItemDetails, { Record } from '../../item-details';

import { withSwapiService } from '../../hoc-helpers';

const records = {
  starShip: [
    {
      id: 1,
      field: 'model',
      label: 'Model'
    },
    {
      id: 2,
      field: 'length',
      label: 'Length'
    },
    {
      id: 3,
      field: 'crew',
      label: 'Crew'
    }
  ]
};

const renderRecord = (recordField) => {
  return recordField.map(({ id, ...props }) => <Record key={ id } {...props} />)
};

const mapMethodsToProps = (swapiService) => ({
  getData: swapiService.getStarship,
  getImageUrl: swapiService.getStarshipImage
});

const StarshipDetails = (props) => {
  const { starShip } = records;
  
  return (
    <ItemDetails { ...props } >
      { renderRecord(starShip) }
    </ItemDetails>
  );
};

export default withSwapiService(StarshipDetails, mapMethodsToProps);
