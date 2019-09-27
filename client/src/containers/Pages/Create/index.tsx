import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createGame, setGameName, setGameNumberOfPlayers } from './actions';
import { Button, Typography, TextField, Grid } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { makeSelectCreateGameInput } from './selectors';
import { IGameInput } from '../../../types';

interface ICreateProps {
  input: IGameInput;
  createGame: () => void;
  setGameName: (name: string) => void;
  setGameNumberOfPlayers: (numberOfPlayers: number) => void;
};

interface ICreateState {
  hasNumberError: boolean;
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  public constructor(props: ICreateProps) {
    super(props);

    this.state = {
      hasNumberError: false,
    }

    this.handleNameChanged = this.handleNameChanged.bind(this);
    this.handleNumberOfPlayersChanged = this.handleNumberOfPlayersChanged.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    return (
      <form noValidate autoComplete="off">
        <Grid container alignContent="flex-end">
          <Grid item xs>
            <Typography variant="h5" component="h1" gutterBottom>Creating a game of Dutch</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={this.props.input.name}
              onChange={this.handleNameChanged}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of players"
              value={this.props.input.numberOfPlayers}
              onChange={this.handleNumberOfPlayersChanged}
              margin="normal"
              variant="outlined"
              error={this.state.hasNumberError}
              type="number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.handleClick} color="primary" variant="contained" fullWidth>Create</Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  private handleClick() {
    this.props.createGame();
  }

  private handleNameChanged(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    this.props.setGameName(event.target.value);
  }

  private handleNumberOfPlayersChanged(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    // poor man's validation
    let hasNumberError = false;
    const numberOfPlayers = parseInt(event.target.value);

    if (isNaN(numberOfPlayers)) {
      hasNumberError = true;
    } else {
      this.props.setGameNumberOfPlayers(numberOfPlayers);
    }

    this.setState({
      hasNumberError,
    });
}
}

const mapStateToProps = () => createStructuredSelector({
  input: makeSelectCreateGameInput(),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createGame: () => dispatch(createGame()),
  setGameName: (name: string) => dispatch(setGameName(name)),
  setGameNumberOfPlayers: (numberOfPlayers: number) => dispatch(setGameNumberOfPlayers(numberOfPlayers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
