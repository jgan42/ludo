import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      textAlign: 'center',
      '& button': {
        margin: '0 auto',
      },
      height: 378,
    },
  },
  unavailableCardMedia: {
    position: 'relative',
    '& > div': { filter: 'grayscale(1)' },
    '&:after': {
      content: 'attr(data-text)',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      color: 'red',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      fontSize: 22,
      fontWeight: 'bold',
    },
  },
  cardMedia: {
    minWidth: 220,
    height: 200,
    border: '1px solid lightgrey',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(1, 0, 1, 1) + ' !important',
  },
  cardDescription: {
    height: 100,
    overflowY: 'auto',
  },
  cardButton: {
    maxWidth: 250,
  },
}));
