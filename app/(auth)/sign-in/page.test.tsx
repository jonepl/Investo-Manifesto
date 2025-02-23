import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from './page';

describe('SignIn page', () => {
  it('renders AuthForm component', () => {
    const { getByText } = render(<SignIn />);
    expect(getByText('Sign In')).toBeInTheDocument();
  });

  it('renders AuthForm with type="sign-in"', () => {
    const { getByTestId } = render(<SignIn />);
    const authForm = getByTestId('auth-form');
    expect(authForm).toHaveAttribute('type', 'sign-in');
  });

  // Add more tests as needed
});