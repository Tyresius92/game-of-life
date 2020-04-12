import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

jest.mock('../Board', () => {
  const MockBoard = () => <div>Fake board component</div>;

  return MockBoard;
});

jest.mock('../ControlPanel', () => {
  const MockControlPanel = () => <div>Fake Control Panel</div>;

  return MockControlPanel;
});

describe('App', () => {
  it('renders a toggle', () => {
    const { getByRole } = render(<App />);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('renders the control panel', () => {
    const { getByText } = render(<App />);
    expect(getByText('Fake Control Panel')).toBeInTheDocument();
  });

  it('renders the board component', () => {
    const { getByText } = render(<App />);
    expect(getByText('Fake board component')).toBeInTheDocument();
  });
});
