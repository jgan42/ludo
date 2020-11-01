import React, { FC, useState } from 'react';
import { AppBar, InputBase, Toolbar, Typography } from '@material-ui/core';
import firebase from 'firebase';
import { config } from './config';
import { Home } from './pages/Home';
import { useStyles } from './styles';
import { Search } from '@material-ui/icons';

firebase.initializeApp(config.firebaseConfig);

export const App: FC = () => {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="App">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Ludothèque de Châtillon</Typography>
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
              inputProps={{ 'aria-label': 'recherche' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Home searchInput={searchInput} />
    </div>
  );
};
