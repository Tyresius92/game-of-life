import React from 'react';
import PATTERNS from '../utils/presetBoardConstants';

const ControlPanel = ({ setBoardCells, disableButtons }) => (
  <div>
    <h1>Control Panel</h1>
    {PATTERNS.map(pattern => (
      <button
        key={pattern.id}
        disabled={disableButtons}
        onClick={() => setBoardCells(pattern.cells)}
      >
        {pattern.name}
      </button>
    ))}
  </div>
);

export default ControlPanel;
