import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createGame } from './actions';

interface ICreateProps {
  createGame: (name: string) => void;
};

export class Create extends React.Component<ICreateProps, {}> {
  public constructor(props: ICreateProps) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    return (
      <>
        <button onClick={this.handleClick}>Create</button>
      </>
    );
  }

  private handleClick() {
    this.props.createGame('dont-care');
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createGame: (name: string) => dispatch(createGame(name, undefined)),
});

export default connect(undefined, mapDispatchToProps)(Create);
