import React from 'react';
import { render } from '@testing-library/react';
import Cell from '../Cell';

describe('Cell', () => {
  it('exists', () => {
    const { getByTestId } = render(<Cell />);
    expect(getByTestId('cell-component')).toBeTruthy();
  });

  it('has the dead className if no isAlive prop passed in', () => {
    const { getByTestId } = render(<Cell />);
    expect(getByTestId('cell-component')).toHaveClass('dead');
  });

  it('has the dead className if isAlive is passed in as false', () => {
    const { getByTestId } = render(<Cell isAlive={false} />);
    expect(getByTestId('cell-component')).toHaveClass('dead');
  });

  it('has the alive className if isAlive is passed in as true', () => {
    const { getByTestId } = render(<Cell isAlive={true} />);
    expect(getByTestId('cell-component')).toHaveClass('alive');
  });
});
