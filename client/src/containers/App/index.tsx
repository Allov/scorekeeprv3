import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Layout from '../../components/Layout';
import Home from '../Home';
import { makeSelectTheme } from './selectors';

interface IAppProps {
  className?: string;
  theme: string;
  history: History;
}

export const App = (props: IAppProps) => {
  return (
    <Layout>
      <ConnectedRouter history={props.history}>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/create/:kind" component={Home} />
        </Switch>
      </ConnectedRouter>
    </Layout>
  );
};

const mapStateToProps = () => createStructuredSelector({
  theme: makeSelectTheme(),
});

export default connect(mapStateToProps)(App);
