import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StyledLayout from '../../components/Layout';
import Home from '../Home';

interface IAppProps {
  className?: string,
  myTheme: ILayoutTheme,
}

interface ILayoutTheme {
  pBackground: string,
  pText: string,
}

export const App = (props: IAppProps) => {
  return (
    <StyledLayout myTheme={props.myTheme}>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/create/:kind" component={Home} />
        </Switch>
      </Router>
    </StyledLayout>
  );
};

export default App;
