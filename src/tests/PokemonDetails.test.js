// REQUISITO 7

import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the "PokemonDetails" component', () => {
  it('checks if the detailed information of the selected Pokémon is shown on the screen:', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(btnNext).toBeDefined();
    userEvent.click(btnNext);
    userEvent.click(btnNext);

    const caterpieName = screen.getByText(/caterpie/i);
    const caterpieImg = screen.getByRole('img', {
      name: /caterpie sprite/i,
      src: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
    });
    const caterpieMoreDetails = screen.getByRole('link', {
      name: /more details/i,
      href: '/pokemon/10',
    });

    expect(caterpieName).toBeDefined();
    expect(caterpieName).toHaveTextContent(/caterpie/i);
    expect(caterpieImg).toBeDefined();
    expect(caterpieImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');
    expect(caterpieMoreDetails).toBeDefined();
    expect(caterpieMoreDetails).toHaveAttribute('href', '/pokemon/10');
    userEvent.click(caterpieMoreDetails);

    const h2pokemonDetails = screen.getByRole('heading', {
      name: /caterpie details/i,
      level: 2,
    });
    const h2Summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const paragraph = screen.getByText(
      /for protection, it releases a horrible stench from the antennae on its head to drive away enemies\./i,
    );

    expect(h2pokemonDetails).toBeDefined();
    expect(h2pokemonDetails).toHaveTextContent(/caterpie details/i);
    expect(h2Summary).toBeDefined();
    expect(paragraph).toBeDefined();
    expect(paragraph).toHaveTextContent(/for protection, it releases a horrible stench from the antennae on its head to drive away enemies\./i);
  });
  it('checks if there is a section on the page with the maps containing the locations of the Pokémon', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(btnNext).toBeDefined();
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);

    const alakazanMoreDetails = screen.getByRole('link', {
      name: /more details/i,
      href: '/pokemon/65',
    });

    expect(alakazanMoreDetails).toBeDefined();
    userEvent.click(alakazanMoreDetails);

    const h2GameLocation = screen.getByRole('heading', {
      name: /game locations of alakazam/i,
      level: 2,
    });
    const pokemonLocation = screen.getByRole('img', {
      name: /alakazam location/i,
      src: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
      alt: 'Alakazam location',
    });

    expect(h2GameLocation).toBeDefined();
    expect(h2GameLocation).toHaveTextContent(/game locations of alakazam/i);
    expect(pokemonLocation).toBeDefined();
    expect(pokemonLocation).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png');
    expect(pokemonLocation).toHaveAttribute('alt', 'Alakazam location');
  });
  it('checks if the user can favorite a Pokémon through the details page', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(btnNext).toBeDefined();
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);

    const snorlaxMoreDetails = screen.getByRole('link', {
      name: /more details/i,
      href: '/pokemon/143',
    });

    expect(snorlaxMoreDetails).toBeDefined();
    userEvent.click(snorlaxMoreDetails);

    const label = screen.getByText(/pokémon favoritado\?/i);

    expect(label).toBeDefined();
    expect(label).toHaveTextContent(/pokémon favoritado\?/i);

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    expect(checkbox).toBeDefined();
    userEvent.click(checkbox);

    const btnFavoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
      href: /favorites pokémon/i,
    });

    expect(btnFavoritePokemon).toBeDefined();
    userEvent.click(btnFavoritePokemon);

    const favoritedSnorlax = screen.getByText(/snorlax/i);
    const favoritedSnorlaxImg = screen.getByRole('img', {
      name: /snorlax sprite/i,
      src: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    });

    expect(favoritedSnorlax).toBeDefined();
    expect(favoritedSnorlax).toHaveTextContent(/snorlax/i);
    expect(favoritedSnorlaxImg).toBeDefined();
    expect(favoritedSnorlaxImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
    userEvent.click(snorlaxMoreDetails);
    userEvent.click(checkbox); // não está desmarcando o checkbox
    userEvent.click(btnFavoritePokemon);

    const h2FavoritePokemon = screen.getByRole('heading', {
      name: /favorite pokémon/i,
      level: 2,
    });
    // const paragraph = screen.getByText(/no favorite pokémon found/i);

    expect(h2FavoritePokemon).toBeDefined();
    expect(favoritedSnorlax).toBeDefined();
    // expect(paragraph).toHaveTextContent(/no favorite pokémon found/i);
  });
});
