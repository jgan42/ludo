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

export interface Game {
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
  ).filter((e) => e);
  const filteredList = gameList.filter(
    ({ name, description, category }) =>
      (!searchInput ||
        name.match(searchInput) ||
        description.match(searchInput)) &&
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
            <option value="">Hors catégories</option>
            {categories.map((name) => (
              <option value={name}>{name}</option>
            ))}
          </Select>
        </Toolbar>
      </AppBar>
      <Home gameList={filteredList} />
    </div>
  );
};
