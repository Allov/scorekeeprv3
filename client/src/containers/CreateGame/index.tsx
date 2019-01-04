import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as actions from '../App/actions';
import { makeSelectGameName } from '../App/selectors';

interface ICreateGameProps {
  name?: string;
  createGame(name: string): void;
}

class CreateGame extends React.Component<ICreateGameProps, {}> {
  public render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <button onClick={this.handleCreateGame}>Create</button>
      </div>
    );
  }

  private handleCreateGame = () => {
    this.props.createGame('sapin');
  }
}

export function mapDispatchToProps(dispatch: React.Dispatch<actions.ICreateGame>) {
  return {
    createGame: (name: string) => dispatch(actions.createGame(name)),
  }
}

export function mapStateToProps() {
  return createStructuredSelector({
    name: makeSelectGameName(),
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateGame);
