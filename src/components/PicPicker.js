import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PicPicker extends Component {
  static propTypes = {
    initImages    : PropTypes.func.isRequired,
    picTwoPics    : PropTypes.func.isRequired,
    pickFirstPic  : PropTypes.func.isRequired,
    pickSecondPic : PropTypes.func.isRequired,
    initNotes     : PropTypes.func.isRequired,
    canVote       : PropTypes.bool.isRequired,
    firstPic      : PropTypes.object,
    secondPic     : PropTypes.object
  };

  componentDidMount () {
    this.props.initImages();
    this.props.initNotes();
  }

  get picSelector () {
    if (this.props.canVote) {
      return (
        <div>
          <div style={{ width : '50%', display : 'inline-block' }}>
            {this.firstPic}
          </div>
          <div style={{ width : '50%', display : 'inline-block' }}>
            {this.secondPic}
          </div>
        </div>
      );
    }
  }

  get firstPic () {
    const {
      firstPic,
      pickFirstPic,
      picTwoPics
    } = this.props;

    if (firstPic) {
      return <div style={firstPic.imgStyle} onClick={() => {
          pickFirstPic();
          picTwoPics();
        }} />;
    }
  }

  get secondPic () {
    const {
      secondPic,
      pickSecondPic,
      picTwoPics
    } = this.props;

    if (secondPic) {
      return <div style={secondPic.imgStyle} onClick={() => {
        pickSecondPic();
        picTwoPics();
      }} />;
    }
  }

  render () {
    return (
      <div>
        {this.picSelector}
      </div>
    );
  }
};
