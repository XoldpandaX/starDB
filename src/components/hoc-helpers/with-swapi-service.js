import React from 'react';
import { SwapiServiceConsumer } from "../swapi-service-context";

const WithSwapiService = (Wrapped) => {
  return (props) => (
    <SwapiServiceConsumer>
      {
        (swapiService) => {
          return (
            <Wrapped { ...props } swapiService={ swapiService }/>
          );
        }
      }
    </SwapiServiceConsumer>
  )
};

export default WithSwapiService;
