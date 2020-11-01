import React, { FC } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@material-ui/core';
import { database } from 'firebase';
import { useStyles } from './styles';
import { useGetList } from '../../firebase/useGetList';

interface Game {
  name: string;
  availableAt?: string;
  description: string;
  image: string;
}

interface HomeProps {
  searchInput: string;
}

export const Home: FC<HomeProps> = ({ searchInput }) => {
  const ref = database().ref('game-list');

  const classes = useStyles();
  const gameList = useGetList<Game>(ref);
  const filteredList = gameList.filter(
    ({ name, description }) =>
      !searchInput || name.match(searchInput) || description.match(searchInput),
  );

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4">Liste des jeux disponibles</Typography>
      <Typography variant="body1">
        Vous pouvez emprunter un jeu sur réservation, soit par téléphone au
        01.XX.XX.XX.XX ou par mail en cliquant sur le bouton "réserver" ou
        directement à{' '}
        <a href="mailto:test-fyguhij@gmail.com">test-fyguhij@gmail.com</a> en
        précisant le nom du jeu. Si le jeu est indisponible, vous serez mis sur
        liste d'attente.
      </Typography>
      {!filteredList.length && (
        <Card className={classes.card} elevation={3}>
          Aucun résultat =(
        </Card>
      )}
      {filteredList.map(({ name, description, availableAt, image }) => {
        const mailSubject = encodeURIComponent(
          `Reservation de "${name}"${availableAt ? " Liste d'attente" : ''}`,
        );
        const mailBody = encodeURIComponent(
          `Bonjour, je souhaite réserver "${name}".\n Merci.`,
        );
        const mailTo = `mailto:test-fcvghbjhknj@gmail.com?subject=${mailSubject}&body=${mailBody}`;
        const bookGame = (e: any) => {
          if (availableAt) {
            const confirm = window.confirm(
              `"${name}" est actuellement indisponible, voulez vous vous inscrire à la liste d'attente ?`,
            );
            if (!confirm) {
              e.preventDefault();
            }
          }
        };

        return (
          <Card className={classes.card} elevation={3}>
            <span
              className={availableAt ? classes.unavailableCardMedia : ''}
              data-text={`Déjà emprunté jusqu'au\n${availableAt}\n(date approximative)`}
            >
              <CardMedia
                className={classes.cardMedia}
                image={image}
                title={name}
              />
            </span>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5">{name}</Typography>
              <Typography variant="body1" className={classes.cardDescription}>
                {description}
              </Typography>
              <Button
                className={classes.cardButton}
                size="small"
                variant="contained"
                color="primary"
                onClick={bookGame}
                href={mailTo}
              >
                Réserver par email
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
};
