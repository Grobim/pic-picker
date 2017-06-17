import React from 'react';
import PropTypes from 'prop-types';
import './HomeView.scss';

export class HomeView extends React.Component {
  static propTypes = {
    connect: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    userConnected: PropTypes.bool.isRequired
  }

  getConnectionButton () {
    const {
      userConnected,
      connect,
      disconnect
    } = this.props;

    if (userConnected) {
      return (
        <button className='btn btn-primary' onClick={disconnect}>
          Disconnect
        </button>
      );
    } else {
      return (
        <button className='btn btn-primary' onClick={connect}>
          Connection
        </button>
      );
    }
  }

  getImagePicker () {
    const {
      userConnected
    } = this.props;

    if (userConnected) {
      return <div>IMAGES ICC TROLOLOLOLO</div>;
    }
  }

  render () {
    return (
      <div>
        <h4>Welcome!</h4>
        {this.getConnectionButton()}
        {this.getImagePicker()}
      </div>
    );
  };
}

export default HomeView;
