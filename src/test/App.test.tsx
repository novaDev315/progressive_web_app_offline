import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the app header', () => {
    render(<App />);
    expect(screen.getByText('PWA Task Manager')).toBeInTheDocument();
  });

  it('renders the task form', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/task title/i)).toBeInTheDocument();
  });

  it('shows PWA features list', () => {
    render(<App />);
    expect(screen.getByText(/PWA Features Demonstrated/i)).toBeInTheDocument();
  });
});
