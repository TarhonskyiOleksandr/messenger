/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { api } from '@/shared/api';
import { IRegisterForm } from '../types';

export const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<IRegisterForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      const { confirmPassword, agreeTerms, ...reqBody } = data;
      await api.post('/auth/register', reqBody);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-8 p-6"
    >
      <h1 className="mb-8">
        Sign up
      </h1>
      <div className="mb-4">
        <label htmlFor="userName">
          Full Name
        </label>
        <input
          {...register('userName', {
            required: 'This field is required',
            pattern: {
              value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*\s*$/i,
              message: "Name contains invalid symbols"
            }
          })}
          id="userName"
        />
        {
          errors.userName &&
          <p className="validation-error">
            {errors.userName.message}
          </p>
        }
      </div>

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

      <div className="mb-4">
        <label htmlFor="password">
          Password
        </label>
        <input
          {...register('password', { required: 'This field is required' })}
          id="password"
          type="password"
        />
        {
          errors.password &&
          <p className="validation-error">
            {errors.password.message}
          </p>
        }
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          {...register('confirmPassword', {
            required: 'This field is required',
            validate: (value: string) => {
              if (watch('password') !== value) return 'Passwords don\'t match'
            }
          })}
          id="confirmPassword"
          type="password"
        />
        {
          errors.confirmPassword &&
          <p className="validation-error">
            {errors.confirmPassword.message}
          </p>
        }
      </div>

      <div className="mb-7 flex items-center">
        <input
          {...register('agreeTerms', { required: true })}
          id="agreeToTerms"
          type="checkbox"
          className="mr-2"
        />
        <label
          className={`mb-0 font-light text-sm ${errors.agreeTerms ? 'text-red-500' : 'text-gray-500'}`}
          htmlFor="agreeToTerms"
        >
          I agree to the terms and conditions
        </label>
      </div>

      <button
        type="submit"
        className="btn-primary w-full"
      >
        Sign up
      </button>

      <p className="text-gray-500 text-sm mt-4 font-light">
        Already have account?{' '}
        <Link
          to="/login"
          className="text-violet-500 font-semibold"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};
