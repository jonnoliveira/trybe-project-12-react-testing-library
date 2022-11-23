// REQUISITO 5

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Test the "Pokedex" component', () => {
  it('checks if the "Pokedex" component is rendered', () => {
    renderWithRouter(
      <App />,
    );

    const h2Title = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    const noFilter = screen.getByRole('button', {
      name: /all/i,
    });
    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(h2Title).toBeDefined();
    expect(noFilter).toBeDefined();
    expect(nextPokemonBtn).toBeDefined();
  });
  it('checks if the page contains an "h2" heading with the text "Encountered Pokémon"', () => {
    renderWithRouter(<App />);

    const h2Title = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });

    expect(h2Title).toBeDefined();
  });
  it('checks if the next Pokémon in the list is displayed when the "Next Pokémon" button is clicked', () => {
    renderWithRouter(<App />);

    const nextPokemonBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(nextPokemonBtn).toBeDefined();

    const firstPokemonName = screen.getByText(/pikachu/i);
    const firstPokemonImage = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(firstPokemonName).toBeDefined();
    expect(firstPokemonImage).toBeDefined();
    expect(firstPokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    userEvent.click(nextPokemonBtn);

    const secondPokemonName = screen.getByText(/charmander/i);
    const secondPokemonImage = screen.getByRole('img', {
      name: /charmander sprite/i,
    });

    expect(secondPokemonName).toBeDefined();
    expect(secondPokemonImage).toBeDefined();
    expect(secondPokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(secondPokemonImage).not.toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('checks if the Pokédex has the filter buttons', () => {
    renderWithRouter(<App />);

    const arrayOfPokemonTypesWithRepeated = pokemonList.map((pokemon) => pokemon.type);
    const arrayOfPokemonTypes = [...new Set(arrayOfPokemonTypesWithRepeated)];

    const btnsFilter = screen.getAllByTestId('pokemon-type-button');
    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });

    btnsFilter.forEach((button, index) => {
      expect(button).toHaveTextContent(arrayOfPokemonTypes[index]);
      expect(btnAll).toBeDefined();
      expect(btnNext).toBeDefined();

      userEvent.click(button);
    });
  });
  it('check if the Pokédex contains a button to reset the filter', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const btnAll = screen.getByRole('button', {
      name: /all/i,
    });

    expect(btnAll).toBeDefined();
    expect(btnAll).toHaveTextContent(/all/i);
    userEvent.click(btnAll);

    const pokemonPikachu = screen.getByText(/pikachu/i);

    expect(pokemonPikachu).toBeDefined();
    expect(pokemonPikachu).toHaveTextContent(/pikachu/i);
    userEvent.click(btnNext);

    const pokemonCharmander = screen.getByText(/charmander/i);

    expect(pokemonCharmander).toBeDefined();
    expect(pokemonCharmander).toHaveTextContent(/charmander/i);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);

    const pokemonMew = screen.getByText(/mew/i);

    expect(pokemonMew).toBeDefined();
    expect(pokemonMew).toHaveTextContent(/mew/i);
  });
});
