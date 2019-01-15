// import * as connectedReactRouter from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { addPlayerToGame, fetchGame as fetchGameAction } from './actions';
import { IGameAdminPage } from './reducer';
import { makeSelectGameAdminId, makeSelectGameAdminPage } from './selectors';

interface IGameAdminProps {
  gameId: string;
  match: match;
  page: IGameAdminPage;
  addPlayer: (gameId: string, name: string) => void;
  fetchGame: (sharedId: string) => void;
}

export class GameAdmin extends React.Component<IGameAdminProps, {}> {
  public constructor(props: IGameAdminProps) {
    super(props);

    this.handleAddPlayer = this.handleAddPlayer.bind(this);
  }

  public componentDidMount() {
    // don't know how to do better, connected-router doesn't export the selecors...
    // https://github.com/supasate/connected-react-router/issues/160
    this.props.fetchGame((this.props.match.params as any).shareId);
  }

  public render() {
    return (
      <>
        <pre>
          {JSON.stringify(this.props.page, null, 2)}
        </pre>
        <button onClick={this.handleAddPlayer}>Add Player</button>
      </>
    );
  }

  public handleAddPlayer() {
    this.props.addPlayer(this.props.gameId, 'Rodrigue');
  }
}

const mapStateToProps = () => createStructuredSelector({
  gameId: makeSelectGameAdminId(),
  page: makeSelectGameAdminPage(),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addPlayer: (gameId: string, name: string) => dispatch(addPlayerToGame(gameId, name)),
  fetchGame: (shareId: string) => dispatch(fetchGameAction(shareId)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(GameAdmin);
