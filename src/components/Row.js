import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import './Row.css';

const Row = ({ cells }) => (
  <div
    data-testid="row-component"
    style={{
      width: '75%',
      margin: 'auto',
      display: 'grid',
      gridTemplateColumns: `repeat(${cells.length}, 1fr)`,
    }}
    className="row"
  >
    {cells.map((cellStatus, index) => (
      <Cell
        key={index}
        isAlive={cellStatus}
        style={{
          width: `${100 / cells.length}%`,
        }}
      />
    ))}
  </div>
);

Row.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
};

export default Row;
