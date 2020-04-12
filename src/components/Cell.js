import React from 'react';
import PropTypes from 'prop-types';
import './Cell.css';

const Cell = ({ isAlive }) => (
  <div data-testid="cell-component" className={isAlive ? 'alive' : 'dead'} />
);

Cell.propTypes = {
  isAlive: PropTypes.bool,
};

Cell.defaultProps = {
  isAlive: false,
};

export default Cell;
