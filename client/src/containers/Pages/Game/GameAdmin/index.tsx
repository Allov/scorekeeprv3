// import * as connectedReactRouter from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import sillyname from 'sillyname';
import EditablePlayer from '../../../../components/EditablePlayer';
import { IRound } from '../../../../types';
import { addPlayerToGame, deletePlayerFromGame, editedPlayerName, editedPlayerPoints, fetchGame as fetchGameAction } from '../actions';
import { makeSelectGameCurrentRound, makeSelectGameId, makeSelectGameTitle } from '../selectors';

interface IGameAdminProps extends RouteComponentProps<{ shareId: string }> {
  gameId: string;
  title: string;
  currentRound: IRound;
  addPlayer: (gameId: string, name: string) => void;
  deletePlayer: (id: string) => void;
  editPlayerName: (id: string, name: string) => void;
  editPlayerPoints: (id: string, name: string) => void;
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
    this.props.fetchGame(this.props.match.params.shareId);
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
            onDelete={() => this.props.deletePlayer(score.player.id)}
            onNameChanged={(name: string) => this.props.editPlayerName(score.player.id, name)}
            onPointsChanged={(points: string) => this.props.editPlayerPoints(score.player.id, points)}
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
  currentRound: makeSelectGameCurrentRound(),
  gameId: makeSelectGameId(),
  title: makeSelectGameTitle(),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addPlayer: (gameId: string, name: string) => dispatch(addPlayerToGame(gameId, name)),
  deletePlayer: (id: string) => dispatch(deletePlayerFromGame(id)),
  editPlayerName: (id: string, name: string) => dispatch(editedPlayerName(id, name)),
  editPlayerPoints: (id: string, points: string) => dispatch(editedPlayerPoints(id, points)),
  fetchGame: (shareId: string) => dispatch(fetchGameAction(shareId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameAdmin));
