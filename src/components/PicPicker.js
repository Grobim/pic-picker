import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PicPicker extends Component {
  static propTypes = {
    initImages : PropTypes.func.isRequired,
    picTwoPics : PropTypes.func.isRequired,
    firstPic   : PropTypes.object,
    secondPic  : PropTypes.object
  };

  componentDidMount () {
    this.props.initImages();
  }

  getFirstPic () {
    const {
      firstPic,
      picTwoPics
    } = this.props;

    if (firstPic) {
      return <div style={firstPic.imgStyle} onClick={picTwoPics} />;
    }
  }

  getSecondPic () {
    const {
      secondPic,
      picTwoPics
    } = this.props;

    if (secondPic) {
      return <div style={secondPic.imgStyle} onClick={picTwoPics} />;
    }
  }

  render () {
    return (
      <div>
        <div style={{ width : '50%', display : 'inline-block' }}>
          {this.getFirstPic()}
        </div>
        <div style={{ width : '50%', display : 'inline-block' }}>
          {this.getSecondPic()}
        </div>
      </div>
    );
  }
};
