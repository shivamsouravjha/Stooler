import React from 'react';

import Sourceitem from './sourceitem';
import Card from '../../shared/components/UIElements/Card';
import './grouplist.css';

const SourceList = props => {
  return (
    <ul className="group-list">
      {props.items.map(group => (
        <Sourceitem
          name={group.name}
          details={group.details}
          targetPrice={group.targetPrice}
          duration={group.duration}
          price={group.price}
          unitsPurchase={group.unitsPurchase}
        />
      ))}
    </ul>
  );
};

export default SourceList;
