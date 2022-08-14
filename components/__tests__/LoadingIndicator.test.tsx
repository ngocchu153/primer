import { render } from '@testing-library/react';
import LoadingIndicator from '../LoadingIndicator';

describe('LoadingIndicator', () => {
  it('should render unchanged', () => {
    const { container } = render(<LoadingIndicator />);
    expect(container).toMatchSnapshot();
  });
});
