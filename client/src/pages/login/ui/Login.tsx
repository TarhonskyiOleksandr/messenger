/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '@/entities/me';
import { useAppDispatch } from '@/shared/store';

interface ILogin {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILogin>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    dispatch(login(data)).then((res: any) => {
      if (!res?.error) navigate('/');
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 p-6"
      autoComplete="false"
    >
      <h1 className="mb-8">
        Sign in
      </h1>
      <div className="mb-4">
        <label htmlFor="email">
          Email
        </label>
        <input
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,12}$/i,
              message: 'Invalid email address'
            },
          })}
          id="email"
        />
        {
          errors.email &&
          <p className="validation-error">
            {errors.email.message}
          </p>
        }
      </div>

      <div className="mb-7">
        <label htmlFor="password">
          Password
        </label>
        <input
          {...register('password', { required: 'This field is required' })}
          id="password"
          type="password"
          autoComplete="new-password"
        />
        {
          errors.password &&
          <p className="validation-error">
            {errors.password.message}
          </p>
        }
      </div>

      <button
        type="submit"
        className="btn-primary w-full"
      >
        Login
      </button>

      <p className="text-gray-500 text-sm mt-4 font-light">
        Not registered yet?{' '}
        <Link
          to="/register"
          className="text-violet-500 font-semibold"
        >
          Sign up
        </Link>{' '}
        here!
      </p>
    </form>
  );
};
