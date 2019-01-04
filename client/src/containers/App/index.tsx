import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateGame from '../CreateGame';

interface IAppProps {
  className?: string,
}

const RealRouter = (
  <Router>
    <Route path="/" exact={true} component={CreateGame} />
  </Router>
);

export const App = (router: React.ReactNode) => (props: IAppProps) => {
  return (
    <div className={props.className}>
      <div className="App">
        {router}
      </div>
    </div>
  );
};

export default App(RealRouter);
