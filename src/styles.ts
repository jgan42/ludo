import { fade, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    whiteSpace: 'nowrap',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('xs')]: {
      width: 150,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: '100%',
    height: 35,
  },
  select: {
    paddingLeft: theme.spacing(2),
    color: 'white',
    '& option': {
      backgroundColor: 'grey !important',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
