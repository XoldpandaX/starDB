import React from 'react';

import ItemDetails, { Record } from '../../item-details';

import { SwapiServiceConsumer } from '../../swapi-service-context';

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

const PlanetDetails = ({ itemId }) => {
  const { planet } = records;
  
  return (
    <SwapiServiceConsumer>
      {
        ({ getPlanet, getPlanetImage }) => {
          return (
            <ItemDetails
              itemId={itemId}
              getData={getPlanet}
              getImageUrl={getPlanetImage}
            >
              { renderRecord(planet) }
            </ItemDetails>
          );
        }
      }
    </SwapiServiceConsumer>
  );
};

export default PlanetDetails;
