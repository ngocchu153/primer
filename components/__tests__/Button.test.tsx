import { render, screen } from '@testing-library/react';
import Button from '@/components/Button';

// eslint-disable-next-line react/display-name
jest.mock('../LoadingIndicator', () => () => {
  return <div data-testid="mock-indicator">loading</div>;
});

describe('Button', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should render normal button', () => {
    render(<Button loading={false} data-testid="normal-button" />);

    const button = screen.getByTestId('normal-button');

    expect(button).toHaveClass(
      'rounded border border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-2 text-white'
    );
  });

  it('should render disabled button', () => {
    render(<Button disabled={true} data-testid="disabled-button" />);

    const button = screen.getByTestId('disabled-button');

    expect(button).toBeDisabled();
  });

  it('should render button with loading indicator', () => {
    render(<Button loading={true} data-testid="loading-button" />);

    const indicator = screen.getByTestId('mock-indicator');
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveTextContent('loading');
  });
});
