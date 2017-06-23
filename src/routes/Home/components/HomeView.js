import React from 'react';
import PropTypes from 'prop-types';
import './HomeView.scss';

import PicPickerContainer from 'containers/PicPickerContainer';

export class HomeView extends React.Component {
  static propTypes = {
    connect: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    userConnected: PropTypes.bool.isRequired
  }

  get connectionButton () {
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
 
  get resultsButton () {
    if (this.props.userConnected) {
      return (
        <button className='btn' onClick={this.goToResults}>
          Go To Results
        </button>
      );
    }
  }

  goToResults () {
    this.props.router.push('results');
  }
  goToResults = this.goToResults.bind(this);

  get imagePicker () {
    const {
      userConnected
    } = this.props;

    if (userConnected) {
      return <PicPickerContainer />;
    }
  }

  render () {
    return (
      <div>
        <h4>Welcome!</h4>
        {this.connectionButton}
        {this.resultsButton}
        {this.imagePicker}
      </div>
    );
  };
}

export default HomeView;
