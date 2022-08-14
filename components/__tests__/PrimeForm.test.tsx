/* eslint-disable testing-library/no-unnecessary-act */
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import PrimeForm from '@/components/PrimeForm';
import * as requestContainer from '../../utils/request';
import { MAX_INT } from 'consts';

jest.mock('../../utils/request', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../../utils/request'),
  };
});

describe('PrimeForm', () => {
  const originalFetch = global.fetch;

  beforeAll(() => {
    global.fetch = jest.fn(() => Promise.resolve({} as Response));
  });

  afterAll(() => {
    jest.clearAllMocks();
    global.fetch = originalFetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render form', () => {
    render(<PrimeForm data-testid="test-form" />);

    const form = screen.getByTestId('test-form');

    expect(form).toBeInTheDocument();
  });

  test('should validate min input', async () => {
    render(<PrimeForm data-testid="test-form" />);

    const input = screen.getByRole('input-number');
    fireEvent.change(input, {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(
        screen.getByText('Your input should be greater or equal than 3')
      ).toBeInTheDocument();
    });
  });

  test('should validate max input', async () => {
    render(<PrimeForm data-testid="test-form" />);

    const input = screen.getByRole('input-number');
    fireEvent.change(input, {
      target: { value: MAX_INT + 10 },
    });

    await waitFor(() => {
      expect(
        screen.getByText(`Your input should be less than ${MAX_INT}`)
      ).toBeInTheDocument();
    });
  });

  it('should be able to submit the form when input is valid', async () => {
    render(<PrimeForm data-testid="test-form" />);

    const button = screen.getByText('Evaluate');
    const input = screen.getByRole('input-number');
    act(() => {
      fireEvent.change(input, {
        target: { value: 55 },
      });
    });

    expect((input as HTMLInputElement).value).toEqual('55');
    expect(button).not.toBeDisabled();
  });

  it('should send request to server when submit the form', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ data: 53 }),
    } as Response);
    jest.spyOn(requestContainer, 'default');
    render(<PrimeForm data-testid="test-form" />);

    const button = screen.getByText('Evaluate');
    const input = screen.getByRole('input-number');
    act(() => {
      fireEvent.change(input, {
        target: { value: 55 },
      });
    });
    act(() => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(requestContainer.default).toHaveBeenCalled();
    });
  });

  it('should show result after get reponse from api call', async () => {
    const result = 53;
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 200,
      json: () => Promise.resolve({ data: result }),
    } as Response);
    jest.spyOn(requestContainer, 'default');
    render(<PrimeForm data-testid="test-form" />);

    const button = screen.getByText('Evaluate');
    const input = screen.getByRole('input-number');
    act(() => {
      fireEvent.change(input, {
        target: { value: 55 },
      });
    });
    act(() => {
      fireEvent.click(button);
    });

    const resultInput = screen.getByRole('result');
    await waitFor(() => {
      expect(resultInput).toHaveAttribute('value', `${result}`);
    });
  });

  it('should show error after get error reponse from api call', async () => {
    const message = 'Internal Server Error';
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 500,
      json: () => Promise.resolve({ message: 'Internal Server Error' }),
    } as Response);
    render(<PrimeForm data-testid="test-form" />);

    const button = screen.getByText('Evaluate');
    const input = screen.getByRole('input-number');
    act(() => {
      fireEvent.change(input, {
        target: { value: 1234 },
      });
    });
    act(() => {
      fireEvent.click(button);
    });

    const errorMsg = screen.getByRole('error-message');
    await waitFor(() => {
      expect(errorMsg).toHaveTextContent(message);
    });
  });
});
