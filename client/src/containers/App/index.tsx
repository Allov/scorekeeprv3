import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../../components/Layout';
import Home from '../Home';

interface IAppProps {
  className?: string,
}

export const App = (props: IAppProps) => {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/create/:kind" component={Home} />
        </Switch>
      </Router>
    </Layout>
  );
};

export default App;
