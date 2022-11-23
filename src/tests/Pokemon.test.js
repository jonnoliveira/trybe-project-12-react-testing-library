// REQUISITO 6

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Test the "Pokemon" component', () => {
  it('checks if a card with the information of a certain Pokémon is rendered', () => {
    renderWithRouter(<App />);

    const pikachuName = screen.getByText(/pikachu/i);
    const pikachuType = (screen.getByTestId('pokemon-type').innerHTML);
    const pikachuWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemonPikachuImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
      src: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    });

    expect(pikachuName).toBeDefined();
    expect(pikachuName).toHaveTextContent(/pikachu/i);
    expect(pikachuType).toBeDefined();
    expect(pikachuType).toMatch(/electric/i);
    expect(pikachuWeight).toBeDefined();
    expect(pikachuWeight).toHaveTextContent(/average weight: 6\.0 kg/i);
    expect(pokemonPikachuImg).toBeDefined();
    expect(pokemonPikachuImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('checks whether the card for the Pokémon indicated in the Pokédex contains a navigation link to view details for that Pokémon. The link must have the URL "/pokemon/<id>", where "<id>" is the id of the displayed Pokémon;', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
      href: '/pokemon/23',
    });

    userEvent.click(btnNext);
    userEvent.click(btnNext);
    userEvent.click(btnNext);

    const ekansName = screen.getByText(/ekans/i);
    const ekansType = (screen.getByTestId('pokemon-type').innerHTML);
    const ekansWeight = screen.getByText(/average weight: 6\.9 kg/i);
    const pokemonEkansImg = screen.getByRole('img', {
      name: /ekans sprite/i,
      src: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    });
    const btnMoreDetailsEkans = screen.getByRole('link', {
      name: /more details/i,
      href: '/pokemon/23',
    });

    userEvent.click(btnMoreDetailsEkans);

    expect(ekansName).toBeDefined();
    expect(ekansName).toHaveTextContent(/ekans/i);
    expect(ekansType).toBeDefined();
    expect(ekansType).toMatch(/poison/i);
    expect(ekansWeight).toBeDefined();
    expect(ekansWeight).toHaveTextContent(/average weight: 6\.9 kg/i);
    expect(pokemonEkansImg).toBeDefined();
    expect(pokemonEkansImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');

    const h2EkansSummary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const ekansTextSummary = screen.getByText(
      /it can freely detach its jaw to swallow large prey whole\. it can become too heavy to move, however\./i,
    );
    const h2EknasLocation = screen.getByRole('heading', {
      name: /game locations of ekans/i,
      level: 2,
    });
    const ekansMapImage = screen.getByRole('img', {
      name: /ekans location/i,
      src: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
    });
    const ekansImageLegend = screen.getByText(/goldenrod game corner/i);

    expect(h2EkansSummary).toBeDefined();
    expect(ekansTextSummary).toBeDefined();
    expect(ekansTextSummary).toHaveTextContent(/it can freely detach its jaw to swallow large prey whole\. it can become too heavy to move, however\./i);
    expect(h2EknasLocation).toBeDefined();
    expect(ekansMapImage).toBeDefined();
    expect(ekansMapImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
    expect(ekansImageLegend).toHaveTextContent(/goldenrod game corner/i);
  });
  it('checks if the URL displayed in the browser changes to /pokemon/<id>, where <id> is the id of the Pokémon whose details you want to see', () => {
    renderWithRouter(<App />);

    const moreDetailsPikachu = screen.getByRole('link', {
      name: /more details/i,
      href: '/pokemon/25',
    });
    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(moreDetailsPikachu).toBeDefined();
    expect(moreDetailsPikachu).toHaveAttribute('href', '/pokemon/25');
    userEvent.click(btnNext);

    const moreDetailsCharmander = screen.getByRole('link', {
      name: /more details/i,
      href: '/pokemon/4',
    });

    expect(moreDetailsCharmander).toBeDefined();
    expect(moreDetailsCharmander).toHaveAttribute('href', '/pokemon/4');
  });
  it('checks if there is a star icon on favorite pokemons', () => {
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

    const moreDetailsRapidash = screen.getByRole('link', {
      name: /more details/i,
      href: '/pokemon/78',
    });

    expect(moreDetailsRapidash).toBeDefined();
    userEvent.click(moreDetailsRapidash);

    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    expect(favoriteCheckbox).toBeDefined();
    userEvent.click(favoriteCheckbox);

    const btnFavoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    expect(btnFavoritePokemon).toBeDefined();
    userEvent.click(btnFavoritePokemon);

    const rapidashFavoriteIcon = screen.getByRole('img', {
      name: /rapidash is marked as favorite/i,
      alt: 'Rapidash is marked as favorite',
      src: '/star-icon.svg',
    });

    expect(rapidashFavoriteIcon).toBeDefined();
    expect(rapidashFavoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(rapidashFavoriteIcon).toHaveAttribute('alt', 'Rapidash is marked as favorite');
  });
});
