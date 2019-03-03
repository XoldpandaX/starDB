import React from 'react';

import './headline-list.css';

const HeadlineList = ({ item, title }) => {
  const { id, ...rest } = item;
  const itemValues = Object.entries(rest);
  
  return (
    <div className="card-body">
      <h4>{ title }</h4>
      <ul className="list-group list-group-flush">
        {
          itemValues.map(([key, value], idx) => {
            if (idx <= 3) {
              const splitedKey = key.replace(/([A-Z])/g, ' $1').trim();
  
              return (
                <li className="list-group-item"
                    key={ id + key + value }
                >
                <span className="headline-list__term">
                  { splitedKey }
                </span>
                  <span>{ value }</span>
                </li>
              );
            }
          })
        }
      </ul>
    </div>
  );
};

export default HeadlineList;
