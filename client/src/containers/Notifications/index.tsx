import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { INotification } from '../../types';
import { makeSelectNotifications  } from '../Notifications/selectors';

interface INotificationsProps {
  notifications: INotification[];
}

export const Notifications = (props: INotificationsProps) => (
  <>
    {props.notifications &&
      props.notifications.map((n) => n.message)}
  </>
);

const mapStateToProps = () => createStructuredSelector({
  notifications: makeSelectNotifications(),
});

export default connect(mapStateToProps)(Notifications);
