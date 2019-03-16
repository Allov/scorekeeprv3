import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import sillyname from 'sillyname';
import { createGame } from './actions';
import { Button, Typography, TextField, Grid } from '@material-ui/core';

interface ICreateProps {
  createGame: (name: string) => void;
};

interface ICreateState {
  name: string;
}

export class Create extends React.Component<ICreateProps, ICreateState> {
  public constructor(props: ICreateProps) {
    super(props);

    this.state = {
      name: sillyname(),
    };

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
              value={this.state.name}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of players"
              margin="normal"
              variant="outlined"
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
    this.props.createGame(this.state.name);
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createGame: (name: string) => dispatch(createGame(name, undefined)),
});

export default connect(undefined, mapDispatchToProps)(Create);
