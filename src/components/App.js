import React, { useState, useEffect } from 'react';
import Board from './Board';
import getNextIteration from '../utils/gameOfLife';
import ControlPanel from '../components/ControlPanel';
import * as PATTERNS from '../utils/presetBoardConstants';
import './App.css';

const App = () => {
  const [isActive, setIsActive] = useState(true);

  const [cells, setCells] = useState(PATTERNS.BEACON.cells);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => setCells(getNextIteration(cells)), 500);
    }
  }, [isActive, cells]);

  return (
    <div className="App">
      <ControlPanel disableButtons={isActive} setBoardCells={setCells} />
      <input
        type="checkbox"
        id="boardActiveToggle"
        name="boardActiveToggle"
        checked={isActive}
        onChange={() => setIsActive(!isActive)}
      />
      <label htmlFor="boardActiveToggle">Toggle Board</label>
      <Board cells={cells} />
    </div>
  );
};

export default App;
