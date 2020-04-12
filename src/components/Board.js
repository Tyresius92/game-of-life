import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import './Board.css';

const Board = ({ cells }) => (
  <div
    style={{
      height: '1vh',
      display: 'grid',
      gridTemplateRows: `repeat(${cells[0].length}, 1fr)`,
    }}
    //className="board"
  >
    {cells.map((cellRow, index) => (
      <Row key={`cellRow_${index}`} cells={cellRow} />
    ))}
  </div>
);

Board.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired
  ).isRequired,
};

export default Board;
