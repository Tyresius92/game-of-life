import React from 'react';
import { render } from '@testing-library/react';
import Board from '../Board';

jest.mock('../Row', () => {
  const MockRow = () => <div>Fake row text</div>;

  return MockRow;
});

describe('Board', () => {
  it('renders', () => {
    const { getByText } = render(<Board cells={[[true]]} />);
    expect(getByText('Fake row text')).toBeInTheDocument();
  });

  it('renders one Row component per inner array', () => {
    const { getAllByText } = render(
      <Board
        cells={[
          [true, false],
          [false, true],
        ]}
      />
    );

    expect(getAllByText('Fake row text')).toHaveLength(2);
  });
});
