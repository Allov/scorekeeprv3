import App from '../containers/App';
import styled from '../styled-components';

interface IAppProps {
  myTheme: IAppTheme,
}

interface IAppTheme {
  pBackground: string,
  pText: string,
}

export default styled(App)`
  --text-primary: ${(props: IAppProps) => props.myTheme.pText};
  --background-primary: ${(props: IAppProps) => props.myTheme.pBackground};

  button {
    appearance: none;
    background: var(--background-primary);
    border: 1px solid var(--text-primary);
    color: var(--text-primary);
  }

  .App {
    background: var(--background-primary);
    color: var(--text-primary);
    text-align: center;
  }

  .App-logo {
    animation: App-logo-spin infinite 20s linear;
    height: 80px;
  }

  .App-header {
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
  }

  .App-title {
    font-size: 1.5em;
  }

  .App-intro {
    font-size: large;
  }

  @keyframes App-logo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
