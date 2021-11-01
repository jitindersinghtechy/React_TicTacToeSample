import React from 'react';

const Square = props => (
  <button className={`${props.winnerClass} square`} onClick={props.onClick} disabled={props.disableBtn} >
    {props.value}
  </button>
);

export default Square;
