import React from 'react';

import ItemDetails from '../item-details';
import { detailsWithData } from '../hoc-helpers';

import SwapiService from '../../services/swapi';

const {
  getPerson,
  getPersonImage,
  getStarShip,
  getStarShipImage,
  getPlanet,
  getPlanetImage
} = new SwapiService();

const PersonDetails = detailsWithData(
  ItemDetails,
  getPerson,
  getPersonImage
);
const StarShipDetails = detailsWithData(ItemDetails, getStarShip, getStarShipImage);
const PlanetDetails = detailsWithData(ItemDetails, getPlanet, getPlanetImage);

export {
  PersonDetails,
  StarShipDetails,
  PlanetDetails
};
