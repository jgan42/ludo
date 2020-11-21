import React, { FC, useState } from 'react';
import {
  AppBar,
  InputBase,
  Select,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { database, analytics } from 'firebase/app';
import { Home } from './pages/Home';
import { useStyles } from './styles';
import { Search } from '@material-ui/icons';
import { useGetList } from './firebase/useGetList';

const normalizeString = (str?: string) =>
  str
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase() || '';

export interface Game {
  id: string;
  name: string;
  availableAt?: string;
  description: string;
  image: string;
  category: string;
  players?: {
    min: number;
    max: number;
  };
}

export const App: FC = () => {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, selectCategory] = useState('ALL');
  const [selectedPlayers, selectPlayers] = useState(0);
  const ref = database().ref('game-list');
  const gameList = useGetList<Game>(ref);

  const categories = Array.from(
    new Set(gameList.map(({ category }) => category)),
  );
  const maxPlayers = Math.max(
    0,
    ...gameList.map(({ players }) => players?.max || 0),
  );

  const filteredList = gameList.filter(
    ({ name, description, category, players }) =>
      (!searchInput ||
        normalizeString(name).match(normalizeString(searchInput)) ||
        normalizeString(description).match(normalizeString(searchInput))) &&
      (selectedCategory === 'ALL' ||
        (!selectedCategory && !category) ||
        selectedCategory === category) &&
      (!selectedPlayers ||
        !players ||
        (selectedPlayers >= (players.min || 0) &&
          selectedPlayers <= (players.max || 1000))),
  );

  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Ludothèque de Châtillon
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              onChange={(e) => {
                const search_term = e.target.value || '';
                setSearchInput(search_term);
                analytics().logEvent('search', { search_term });
              }}
              placeholder="Rechercher..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <Select
            className={`${classes.search} ${classes.select}`}
            native
            value={selectedCategory}
            onChange={(e) => {
              const category = (e.target.value as string) || '';
              selectCategory(category);
              analytics().logEvent('category_select', { category });
            }}
          >
            <option value="ALL">Toute Catégorie</option>
            {categories.map((name) => (
              <option key={name || 'Hors catégories'} value={name}>
                {name || 'Hors catégories'}
              </option>
            ))}
          </Select>
          <Select
            className={`${classes.search} ${classes.select}`}
            native
            value={selectedPlayers}
            onChange={(e) => {
              const players_number = (e.target.value as string) || '';
              selectPlayers(+players_number);
              analytics().logEvent('players_select', { players_number });
            }}
          >
            {new Array(maxPlayers + 1).fill(0).map((_, i) => (
              <option key={`${_}${i}`} value={i}>
                {i || 'Nombre de '} Joueur{i !== 1 && 's'}
              </option>
            ))}
          </Select>
        </Toolbar>
      </AppBar>
      <Home gameList={filteredList} />
    </div>
  );
};
