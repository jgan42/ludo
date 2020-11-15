import React, { FC, useState } from 'react';
import {
  AppBar,
  InputBase,
  Select,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { database } from 'firebase';
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
}

export const App: FC = () => {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, selectCategory] = useState('ALL');
  const ref = database().ref('game-list');
  const gameList = useGetList<Game>(ref);
  const categories = Array.from(
    new Set(gameList.map(({ category }) => category)),
  );

  const filteredList = gameList.filter(
    ({ name, description, category }) =>
      (!searchInput ||
        normalizeString(name).match(normalizeString(searchInput)) ||
        normalizeString(description).match(normalizeString(searchInput))) &&
      (selectedCategory === 'ALL' ||
        (!selectedCategory && !category) ||
        selectedCategory === category),
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
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Rechercher..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <Select
            className={`${classes.search} ${classes.categorySelect}`}
            native
            value={selectedCategory}
            onChange={(e) => selectCategory(e.target.value as string)}
          >
            <option value="ALL">Toutes</option>
            {categories.map((name) => (
              <option value={name}>{name || 'Hors catégories'}</option>
            ))}
          </Select>
        </Toolbar>
      </AppBar>
      <Home gameList={filteredList} />
    </div>
  );
};
