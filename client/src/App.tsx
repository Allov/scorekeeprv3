import * as React from 'react';

import logo from './logo.svg';

interface IAppProps {
  className?: string,
}

class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <div className={this.props.className}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        </div>
      </div>
    );
  }
}

export default App;
