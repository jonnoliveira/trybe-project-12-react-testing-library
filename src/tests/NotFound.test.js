// REQUISITO 4

import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Test the "NotFound" component', () => {
  it('checks if the "About" component is rendered', () => {
    renderWithRouter(<NotFound />);

    const h2Title = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(h2Title).toBeDefined();
    expect(imgNotFound).toBeDefined();
  });
  it('checks if the page contains an "h2" heading with the text "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const h2Title = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(h2Title).toBeDefined();
  });
  it('checks if the page shows the image "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
      src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    });

    expect(imgNotFound).toBeDefined();
    expect(imgNotFound).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
