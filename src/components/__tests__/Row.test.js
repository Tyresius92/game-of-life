import React from 'react';
import { render } from '@testing-library/react';
import Row from '../Row';

jest.mock('../Cell', () => {
  const PropTypes = require('prop-types');

  const MockCell = ({ isAlive }) => (
    <div>{isAlive ? 'Mock living cell' : 'Mock dead cell'}</div>
  );

  MockCell.propTypes = {
    isAlive: PropTypes.bool.isRequired,
  };

  return MockCell;
});

describe('Row', () => {
  it('contains at least one Cell component', () => {
    const { getByText } = render(<Row cells={[true]} />);
    expect(getByText('Mock living cell')).toBeInTheDocument();
  });

  it.each`
    caseName           | cells
    ${'one dead cell'} | ${[false]}
    ${'one live cell'} | ${[true]}
    ${'two cells'}     | ${[false, true]}
    ${'ten cells'}     | ${[true, true, true, false, false, false, true, true, true, false]}
  `('renders $caseName when cells = $cells', ({ cells }) => {
    const liveCellCount = cells.filter(val => val).length;
    const deadCellCount = cells.length - liveCellCount;

    const { queryAllByText } = render(<Row cells={cells} />);
    expect(queryAllByText('Mock living cell')).toHaveLength(liveCellCount);
    expect(queryAllByText('Mock dead cell')).toHaveLength(deadCellCount);
  });
});
