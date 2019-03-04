// import * as connectedReactRouter from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import sillyname from 'sillyname';
import EditablePlayer from '../../../components/EditablePlayer';
import bindIndexToActionCreators from '../../../lib/redux/bindIndexToActionCreator';
import { IRound } from '../../../types';
import { addPlayerToGame, deletePlayerFromGame, editedPlayerName, editedPlayerPoints, fetchGame as fetchGameAction } from './actions';
import { makeSelectGameAdminCurrentRound, makeSelectGameAdminId, makeSelectGameAdminTitle } from './selectors';

interface IGameAdminProps {
  gameId: string;
  match: match;
  title: string;
  currentRound: IRound;
  addPlayer: (gameId: string, name: string) => void;
  deletePlayer: (id: string) => void;
  fetchGame: (sharedId: string) => void;
  dispatch: Dispatch;
}

const editPlayerDispatchProperties =
  (index: number) =>
    (dispatch: Dispatch) => bindActionCreators(
      bindIndexToActionCreators({
        onNameChanged: (name: string) => editedPlayerName(index, name),
        onPointsChanged: (points: string) => editedPlayerPoints(index, points),
      },
        index),
      dispatch);

export class GameAdmin extends React.Component<IGameAdminProps> {
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
        <h1>{this.props.title}</h1>
        <button onClick={this.handleAddPlayer}>Add Player</button>
        {this.props.currentRound && this.props.currentRound.scores.map((score, i) => (
          <EditablePlayer
            key={i}
            name={score.player.name}
            points={score.points}
            totalScore={score.player.totalScore}
            // tslint:disable-next-line:jsx-no-lambda
            onDelete={() => this.props.deletePlayer(score.player.id)}
            {...editPlayerDispatchProperties(i)(this.props.dispatch)}
          />
        ))}
      </>
    );
  }

  public handleAddPlayer() {
    this.props.addPlayer(this.props.gameId, sillyname());
  }
}

const mapStateToProps = () => createStructuredSelector({
  currentRound: makeSelectGameAdminCurrentRound(),
  gameId: makeSelectGameAdminId(),
  title: makeSelectGameAdminTitle(),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addPlayer: (gameId: string, name: string) => dispatch(addPlayerToGame(gameId, name)),
  deletePlayer: (id: string) => dispatch(deletePlayerFromGame(id)),
  dispatch,
  fetchGame: (shareId: string) => dispatch(fetchGameAction(shareId)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(GameAdmin);
