import React from 'react';

import ItemDetails, { Record } from '../item-details';

import { SwapiServiceConsumer } from '../swapi-service-context';

const records = {
  person: [
    {
      id: 0,
      field: 'gender',
      label: 'Gender'
    },
    {
      id: 1,
      field: 'eyeColor',
      label: 'Eye Color'
    },
    {
      id: 2,
      field: 'birthYear',
      label: 'Birth Year'
    },
    {
      id: 3,
      field: 'gender',
      label: 'Gender'
    }
  ],
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
  ],
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

const renderRecord = (recordField) => (
  recordField.map(({ ...props }) => <Record { ...props } />)
);

const PersonDetails = ({ itemId }) => {
  const { person } = records;
  
  return (
    <SwapiServiceConsumer>
      {
        ({ getPerson, getPersonImage }) => {
          return (
            <ItemDetails
              itemId={ itemId }
              getData={ getPerson }
              getImageUrl={ getPersonImage }
            >
              { renderRecord(person) }
            </ItemDetails>
          );
        }
      }
    </SwapiServiceConsumer>
  );
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

export {
  PersonDetails,
  PlanetDetails,
  StarshipDetails
};
