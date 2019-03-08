import React from 'react';

import ItemDetails, { Record } from '../../item-details';

import { withSwapiService } from '../../hoc-helpers';

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
  ]
};

const renderRecord = (recordField) => {
  return recordField.map(({ id, ...props }) => <Record key={ id } {...props} />)
};

const PersonDetails = ({ itemId, swapiService }) => {
  const { getPerson, getPersonImage } = swapiService;
  const { person } = records;
  
  return (
    <ItemDetails
      itemId={ itemId }
      getData={ getPerson }
      getImageUrl={ getPersonImage }
    >
      { renderRecord(person) }
    </ItemDetails>
  );
};

export default withSwapiService(PersonDetails);
