import { useState } from 'react';
import request from 'utils/request';
import { ApiError } from 'next/dist/server/api-utils';
import { useForm } from 'react-hook-form';
import Button from './Button';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

type FieldValues = {
  input: number;
};

function PrimeForm({ className, ...props }: FormProps) {
  const [result, setResult] = useState<number>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleSubmit, formState, register } = useForm<FieldValues>({
    mode: 'onChange',
  });

  const onSubmit = async (formValue: FieldValues) => {
    if (loading) return;
    const { input: value } = formValue;
    setLoading(true);
    try {
      const { data } = await request<number>(`/api/v1/find?input=${value}`);
      setResult(data);
      setError('');
    } catch (e) {
      const err = e as ApiError;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`my-4 text-center text-xl ${className ?? ''}`}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <label htmlFor="input">Largest prime number lower than</label>
      <input
        role="input-number"
        className="mx-2 w-52 border-b px-2 text-center focus:border-primary focus:placeholder-transparent focus:outline-none"
        placeholder="your chosen number"
        type="number"
        {...register('input', {
          required: 'Enter you number to check',
          min: {
            value: 3,
            message: 'Your input should be greater or equal than 3',
          },
          max: {
            value: Number.MAX_SAFE_INTEGER,
            message: `Your input should be less than ${Number.MAX_SAFE_INTEGER}`,
          },
        })}
      />
      <span>is:</span>
      <input
        role="result"
        className="mx-2 w-52 border-b border-green-500 px-2 text-center text-green-500 outline-none"
        readOnly
        placeholder="the result"
        type="number"
        value={result ?? ''}
      />

      <div
        role='error-message'
        className={`my-2 h-5 text-xs text-red-500 ${
          (formState.errors?.input || error) && 'invisible'
        }}`}
      >
        {formState.errors?.input?.message ?? error}
      </div>

      <Button
        disabled={!!formState.errors.input}
        loading={loading}
        icon={<Icon icon={faCalculator} />}
        type="submit"
        title="Evaluate"
      />
    </form>
  );
}
export default PrimeForm;
