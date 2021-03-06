import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Layout from '../../components/Layout';
import { themePicker } from '../../lib/styled/interface';
import { makeSelectTheme } from '../Configurations/selectors';
import Notifications from '../Notifications';
import Create from '../Pages/Create';
import GameAdmin from '../Pages/Game/GameAdmin';
import GameView from '../Pages/Game/GameView';
import Home from '../Pages/Home';

interface IAppProps {
  className?: string;
  history: History;
}

interface IAppConnectedProps {
  theme: string;
}

export const App = (props: IAppProps & IAppConnectedProps) => {
  return (
    <Layout theme={themePicker[props.theme]}>
      <Notifications />
      <ConnectedRouter history={props.history}>
        { /* here be transitions */ }
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/create/:kind" component={Create} />
          <Route path="/game/:shareId/admin" component={GameAdmin} />
          <Route path="/game/:shareId" component={GameView} />
        </Switch>
      </ConnectedRouter>
    </Layout>
  );
};

const mapStateToProps = () => createStructuredSelector<{}, IAppProps, IAppConnectedProps>({
  theme: makeSelectTheme(),
});

export default connect<{}, IAppConnectedProps>(mapStateToProps)(App);
