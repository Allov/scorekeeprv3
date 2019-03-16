import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import MenuIcon from '@material-ui/icons/Menu';
import { makeSelectTheme } from '../Configurations/selectors';
import Notifications from '../Notifications';
import Create from '../Pages/Create';
import GameAdmin from '../Pages/Game/GameAdmin';
import GameView from '../Pages/Game/GameView';
import Home from '../Pages/Home';
import 'typeface-roboto';
import { Slide, CssBaseline, AppBar, IconButton, Typography, withStyles, Link, Fade } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeSelectPathname, makeSelectAction } from './selectors';

interface IAppProps {
  className?: string;
  history: History;
  classes: IAppStyles;
}

interface IAppConnectedProps {
  action: string;
  pathname: string;
  theme: string;
}

interface IAppStyles {
  root: any;
  grow: any;
  menuButton: any;
}

const styles: IAppStyles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export const App = (props: IAppProps & IAppConnectedProps) => {
  const {
    action,
    classes,
    history,
    pathname,
  } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ConnectedRouter history={history}>
        <>
          <AppBar position="static">
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link component={RouterLink as any} {...{ to: "/" }} color="inherit" underline="none">
                scorekeepr
              </Link>
            </Typography>
          </AppBar>
          <Notifications />
          <Slide key={pathname} in direction={action == 'POP' ? 'right' : 'left'}>
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/create/:kind" component={Create} />
              <Route path="/game/:shareId/admin" component={GameAdmin} />
              <Route path="/game/:shareId" component={GameView} />
            </Switch>
          </Slide>
        </>
      </ConnectedRouter >
    </div >
  );
};

const mapStateToProps = () => createStructuredSelector<{}, IAppProps, IAppConnectedProps>({
  action: makeSelectAction(),
  pathname: makeSelectPathname(),
  theme: makeSelectTheme(),
});

export default connect<{}, IAppConnectedProps>(mapStateToProps)(withStyles(styles)(App));
