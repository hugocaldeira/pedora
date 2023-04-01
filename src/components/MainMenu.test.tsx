import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import MainMenu from './MainMenu';
import { BrowserRouter } from 'react-router-dom';

describe('MainMenu', () => {
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <MainMenu />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
    });
  });

  test('displays correct menu items', async () => {
    render(
      <BrowserRouter>
        <MainMenu />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('News')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Weather')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Secret friend')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });

  test('updates current menu item on click', async () => {
    render(
      <BrowserRouter>
        <MainMenu />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Weather'));
    await waitFor(() => {
      expect(window.location.href).toContain('/weather');
    });
  });
});
