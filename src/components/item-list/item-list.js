import React from 'react';

import './item-list.css';

const ItemList = ({ onPersonSelected, items, children }) => {
  const itemElements = items.map((item) => {
    const { id } = item;
    const value = children(item);
  
    return (
      <li
        className='list-group-item'
        key={ id }
        onClick={ () => onPersonSelected(id) }
      >
        <div>{ value }</div>
      </li>
    );
  });
  
  return (
    <ul className="item-list list-group">
      { itemElements }
    </ul>
  );
};

export default ItemList;
