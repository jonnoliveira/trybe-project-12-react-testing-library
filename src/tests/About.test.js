// Requisito 2

import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Test the "About" component', () => {
  it('checks if the "About" component is rendered', () => {
    renderWithRouter(<About />);

    const h2TitleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    const firstParagraph = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const secondParagraph = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    const imgAbout = screen.getByRole('img', {
      name: /pokédex/i,
    });

    expect(h2TitleAbout).toBeDefined();
    expect(firstParagraph).toBeDefined();
    expect(secondParagraph).toBeDefined();
    expect(imgAbout).toBeDefined();
  });

  it('checks if the page contains an "h2" header with the text "About Pokédex"', () => {
    renderWithRouter(<About />);

    const h2TitleAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    const imgAbout = screen.getByRole('img', {
      name: /pokédex/i,
    });

    expect(h2TitleAbout).toBeDefined();
    expect(imgAbout).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
