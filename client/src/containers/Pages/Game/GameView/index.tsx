import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { IRound } from '../../../../types';
import { fetchGame } from '../actions';
import { subscribeToGame } from '../actions';
import { makeSelectGameCurrentRound, makeSelectGameId, makeSelectGameTitle } from '../selectors';

interface IGameViewProps extends RouteComponentProps<{ shareId: string }> {
  gameId: string;
  title: string;
  currentRound: IRound;
  subscribeToGame: (sharedId: string) => void;
  fetchGame: (shareId: string) => void;
}

export class GameView extends React.Component<IGameViewProps, {}> {
  public componentDidMount() {
    // don't know how to do better, connected-router doesn't export the selectors...
    // https://github.com/supasate/connected-react-router/issues/160
    const shareId = this.props.match.params.shareId;
    this.props.fetchGame(shareId)
    this.props.subscribeToGame(shareId);
  }

  public render() {
    if (!this.props.currentRound) { return <p>Loading...</p>; }

    return (
      <>
        <h1>{this.props.title}</h1>
        {this.props.currentRound.scores.map((score, index) => (<div key={index}>{score.player.name} {score.points} {score.player.totalScore}</div>))}
      </>
    );
  }
}

const mapStateToProps = () => createStructuredSelector({
  currentRound: makeSelectGameCurrentRound(),
  gameId: makeSelectGameId(),
  title: makeSelectGameTitle(),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchGame: (shareId: string) => dispatch(fetchGame(shareId)),
  subscribeToGame: (shareId: string) => dispatch(subscribeToGame(shareId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameView));
