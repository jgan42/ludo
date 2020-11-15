import React, { FC, useEffect, useState } from 'react';
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

const bookGame = (name: string, availableAt?: string) => {
  if (availableAt) {
    const confirm = window.confirm(
      `"${name}" est actuellement indisponible, voulez vous vous inscrire à la liste d'attente ?`,
    );
    if (!confirm) {
      return;
    }
  }
  const mailSubject = encodeURIComponent(
    `Reservation de "${name}"${availableAt ? " Liste d'attente" : ''}`,
  );
  const mailBody = encodeURIComponent(
    `Bonjour, je souhaite réserver "${name}".\n\nMerci.`,
  );
  window.location.href = `mailto:jeunesse.ludo@chatillon92.fr?subject=${mailSubject}&body=${mailBody}`;
};

interface HomeProps {
  gameList: Game[];
}

export const Home: FC<HomeProps> = ({ gameList }) => {
  const classes = useStyles();
  const [hideStart, setHideStart] = useState(0);

  const error = gameList.find(
    ({ description, category, availableAt, image, name, id, ...r }) =>
      Object.keys(r).length && (!description || !image || !name),
  );

  useEffect(() => {
    const handleScroll = () => {
      const height =
        document.getElementById('list-container')?.clientHeight || 0;
      const cardScrolled =
        Math.floor(window.scrollY / (height / (gameList.length + 1))) - 1;
      setHideStart(Math.max(0, Math.floor(cardScrolled / 10) * 10 - 10));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [gameList.length]);

  return (
    <Container id="list-container" maxWidth="md" className={classes.container}>
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
      {error && (
        <Card className={classes.card} elevation={3}>
          Erreur sur le jeu :{' '}
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(error, null, 2)}
          </div>
        </Card>
      )}
      {!gameList.length && (
        <Card className={classes.card} elevation={3}>
          Aucun résultat =(
        </Card>
      )}
      {gameList.map(({ name, description, availableAt, image }, i) => (
        <Card key={name} className={classes.card} elevation={3}>
          {i >= hideStart && i < hideStart + 30 && (
            <>
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
                  onClick={() => bookGame(name, availableAt)}
                >
                  Réserver par email
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      ))}
    </Container>
  );
};
