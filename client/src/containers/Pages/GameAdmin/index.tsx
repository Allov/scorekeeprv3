// import * as connectedReactRouter from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose, Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { fetchGame as fetchGameAction } from './actions';
import { IGameAdminPage } from './reducer';
import { makeSelectGameAdminPage } from './selectors';

interface IGameAdminProps {
  match: match;
  page: IGameAdminPage;
  fetchGame: (sharedId: string) => void;
}

class GameAdmin extends React.Component<IGameAdminProps, {}> {
  public componentDidMount() {
    // don't know how to do better, connected-router doesn't export the selecors...
    // https://github.com/supasate/connected-react-router/issues/160
    this.props.fetchGame((this.props.match.params as any).shareId);
  }

  public render() {
    return (
      <>
        {JSON.stringify(this.props.page)}
      </>
    );
  }
}

const mapStateToProps = () => createStructuredSelector({
  page: makeSelectGameAdminPage(),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchGame: (shareId: string) => dispatch(fetchGameAction(shareId)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(GameAdmin);
