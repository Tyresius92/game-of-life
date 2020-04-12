import React from 'react';
import { render } from '@testing-library/react';
import ControlPanel from '../ControlPanel';
import PATTERNS from '../../utils/presetBoardConstants';

describe('ControlPanel', () => {
  it('exists', () => {
    const { getByText } = render(<ControlPanel />);
    expect(getByText('Control Panel')).toBeInTheDocument();
  });

  it('renders one button per preset board', () => {
    const { queryAllByRole } = render(<ControlPanel />);
    expect(queryAllByRole('button')).toHaveLength(PATTERNS.length);
  });
});
