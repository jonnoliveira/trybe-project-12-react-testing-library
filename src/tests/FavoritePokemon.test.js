//  REQUISITO 3

import { screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../renderWithRouter';

const pokemonList = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  },
];

describe('Test the "FavoritePokemon" component', () => {
  it('checks if the "FavoritePokemon" component is rendered', () => {
    renderWithRouter(<FavoritePokemon />);

    const h2TitleFavorite = screen.getByRole('heading', {
      name: /favorite pokémon/i,
    });
    const noFavoritePokemon = screen.getByText(/no favorite pokémon found/i);

    expect(h2TitleFavorite).toBeDefined();
    expect(noFavoritePokemon).toBeDefined();
  });
  it('check if the message "No favorite pokemon found" is displayed on the screen, if the person does not have favorite Pokémon', () => {
    renderWithRouter(<FavoritePokemon />);

    const noFavoritePokemon = screen.getByText(/no favorite pokémon found/i);

    expect(noFavoritePokemon).toBeDefined();
  });
  it('checks that all favorite Pokémon cards are displayed', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    const firstFavorite = screen.getByText(/pikachu/i);
    const firstType = screen.getByText(/electric/i);
    const firstAverageWeight = screen.getByText(/average weight: 6\.0 kg/i);

    expect(firstFavorite).toBeDefined();
    expect(firstType).toBeDefined();
    expect(firstAverageWeight).toBeDefined();

    const secondFavorite = screen.getByText(/charmander/i);
    const secondType = screen.getByText(/fire/i);
    const secondAverageWeight = screen.getByText(/average weight: 8\.5 kg/i);

    expect(secondFavorite).toBeDefined();
    expect(secondType).toBeDefined();
    expect(secondAverageWeight).toBeDefined();

    const moreDetailsBtns = screen.getAllByRole('link', {
      name: /more details/i,
    });

    expect(moreDetailsBtns[0]).toBeDefined();
    expect(moreDetailsBtns[1]).toBeDefined();
  });
});
