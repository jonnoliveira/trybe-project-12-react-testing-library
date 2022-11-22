// REQUISITO 1

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the "App" component', () => {
  it('checks if the "App" component is rendered', () => {
    renderWithRouter(<App />);

    const homeEl = screen.getByRole('link', {
      name: /home/i,
    });
    const aboutEl = screen.getByRole('link', {
      name: /about/i,
    });
    const favoritePokemonEl = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(homeEl).toBeDefined();
    expect(aboutEl).toBeDefined();
    expect(favoritePokemonEl).toBeDefined();
  });

  it('checks if the first link has the text "Home"', () => {
    renderWithRouter(<App />);

    const homeEl = screen.getByText(/home/i);

    expect(homeEl).toBeDefined();
  });

  it('checks if the second link has the text "About"', () => {
    renderWithRouter(<App />);

    const aboutEl = screen.getByText(/about/i);

    expect(aboutEl).toBeDefined();
  });

  it('checks if the third link has the text "Favorite Pokémon"', () => {
    renderWithRouter(<App />);

    const favoritePokemontEl = screen.getByText(/favorite pokémon/i);

    expect(favoritePokemontEl).toBeDefined();
  });

  it('checks if the application is redirected to the homepage, in the URL "/" when clicking on the "Home" link   in the navigation bar', () => {
    const { history } = renderWithRouter(<App />);

    const homeEl = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeEl).toBeDefined();
    userEvent.click(homeEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const h1Title = screen.getByRole('heading', {
      name: /pokédex/i,
    });
    expect(h1Title).toBeDefined();
  });

  it('checks if the application is redirected to the aboutpage, in the URL "/about" when clicking on the "About" link   in the navigation bar', () => {
    const { history } = renderWithRouter(<App />);

    const aboutEl = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutEl).toBeDefined();
    userEvent.click(aboutEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutPokedex = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    const imageAbout = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(aboutPokedex).toBeDefined();
    expect(imageAbout).toBeDefined();
  });

  it('checks if the application is redirected to the Pokémon Favorites page, at the URL "/favorites", when clicking on the "Pokémon Favorites" link in the navigation bar;', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemontEl = screen.getByText(/favorite pokémon/i);
    expect(favoritePokemontEl).toBeDefined();
    userEvent.click(favoritePokemontEl);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const h2FavoritePokemon = screen.getByRole('heading', {
      name: /favorite pokémon/i,
    });
    expect(h2FavoritePokemon).toBeDefined();
  });
});
