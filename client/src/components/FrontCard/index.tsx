import * as React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Divider, Grid, withStyles } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleTwoTone';
import TimerIcon from '@material-ui/icons/TimerTwoTone';
import CrownSvg from '../../assets/crown.svg';
import { Link } from 'react-router-dom';

interface IFrontCardProps {
  title: string,
  summary: string,
  playerCount: string,
  time: string,
  link: string,
  className?: string,
  classes?: any,
}

const styles = (theme: any) => ({
  divider: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  image: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: `60%`,
  }
})

export const FrontCard = (props: IFrontCardProps) => (
  <Card>
    <CardActionArea component={Link as any} {...{to: props.link}}>
      <CardMedia className={props.classes.image} src={CrownSvg} component="img" title="Dutch" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography component="p">
          {props.summary}
        </Typography>
        <Divider variant="middle" className={props.classes.divider} />
        <Grid container>
          <Grid item xs>
            <Typography component="p">
              <PeopleIcon /> {props.playerCount}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography component="p">
              <TimerIcon /> {props.time}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary" component={Link as any} {...{to: props.link}}>
        Play
      </Button>
      <Button size="small" color="secondary" component="a" {...{href: 'https://gist.github.com/Allov/c59849077535b061a1edfe490b72de92', target: '_blank'}}>
        Rules
      </Button>
    </CardActions>
  </Card>
);

export default withStyles(styles)(FrontCard);
