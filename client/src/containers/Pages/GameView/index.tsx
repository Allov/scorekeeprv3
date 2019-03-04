import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { IRound } from '../../../types';
import { subscribeToGame } from './actions';
import { makeSelectGameViewCurrentRound, makeSelectGameViewId, makeSelectGameViewTitle } from './selectors';

interface IGameViewProps {
  gameId: string;
  match: match;
  title: string;
  currentRound: IRound;
  subscribeToGame: (sharedId: string) => void;
}

export class GameView extends React.Component<IGameViewProps> {
  public componentDidMount() {
    // don't know how to do better, connected-router doesn't export the selecors...
    // https://github.com/supasate/connected-react-router/issues/160
    this.props.subscribeToGame((this.props.match.params as any).shareId);
  }

  public render() {
    if (!this.props.currentRound) { return null; }

    return (
      <>
        <h1>{this.props.title}</h1>
        {this.props.currentRound.scores.map((score, index) => (<div key={index}>{score.player.name} {score.points} {score.player.totalScore}</div>))}
      </>
    );
  }
}

const mapStateToProps = () => createStructuredSelector({
  currentRound: makeSelectGameViewCurrentRound(),
  gameId: makeSelectGameViewId(),
  title: makeSelectGameViewTitle(),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribeToGame: (shareId: string) => dispatch(subscribeToGame(shareId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
