import React from 'react';

import ErrorButton from '../error-button';

import './item-details.css';

const ItemDetails = ({ classes, item, imageUrl, children }) => {
  const { name: title } = item;
  
  return (
    <div className={ classes }>
      <React.Fragment>
        <img
          className="item-image"
          src={ imageUrl }
          alt='item'
        />
        <div className="card-body">
          <h4>{ title }</h4>
          <ul className="list-group list-group-flush mb-5">
            {
              React.Children.map(children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton/>
        </div>
      </React.Fragment>
    </div>
  );
};

export default ItemDetails;
