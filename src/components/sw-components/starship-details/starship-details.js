import React from 'react';

import ItemDetails, { Record } from '../../item-details';

import { SwapiServiceConsumer } from '../../swapi-service-context';

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

const StarshipDetails = ({ itemId }) => {
  const { starShip } = records;
  
  return (
    <SwapiServiceConsumer>
      {
        ({ getStarship, getStarshipImage }) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getStarship}
              getImageUrl={getStarshipImage}
            >
              { renderRecord(starShip) }
            </ItemDetails>
          );
        }
      }
    </SwapiServiceConsumer>
  );
};

export default StarshipDetails;
