import React, { FC } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@material-ui/core';
import { useStyles } from './styles';
import { Game } from '../../App';

interface HomeProps {
  gameList: Game[];
}

export const Home: FC<HomeProps> = ({ gameList }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4">
        Liste des jeux disponibles (
        {gameList.filter(({ availableAt }) => !availableAt).length}/
        {gameList.length})
      </Typography>
      <Typography variant="body1">
        Vous pouvez emprunter un jeu sur réservation, par téléphone au{' '}
        <a href="tel:+33147357799">01 47 35 77 99</a> /{' '}
        <a href="tel:+33616085546">06 16 08 55 46</a>, par mail en cliquant sur
        le bouton "réserver" ou directement à{' '}
        <a href="mailto:jeunesse.ludo@chatillon92.fr">
          jeunesse.ludo@chatillon92.fr
        </a>{' '}
        en précisant le nom du jeu et la date à laquelle vous viendrez le
        chercher. Si le jeu est indisponible, vous serez mis sur liste
        d'attente.
      </Typography>
      {!gameList.length && (
        <Card className={classes.card} elevation={3}>
          Aucun résultat =(
        </Card>
      )}
      {gameList.map(({ name, description, availableAt, image }) => {
        const mailSubject = encodeURIComponent(
          `Reservation de "${name}"${availableAt ? " Liste d'attente" : ''}`,
        );
        const mailBody = encodeURIComponent(
          `Bonjour, je souhaite réserver "${name}".\n\nMerci.`,
        );
        const mailTo = `mailto:jeunesse.ludo@chatillon92.fr?subject=${mailSubject}&body=${mailBody}`;
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
