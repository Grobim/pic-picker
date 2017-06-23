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
    if (!this.props.canVote) {
      this.props.initNotes();
    }
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
      const style = {
        ...firstPic.imgStyle,
        cursor: 'pointer'
      };
      return <div style={style} onClick={() => {
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
      const style = {
        ...secondPic.imgStyle,
        cursor: 'pointer'
      };
      return <div style={style} onClick={() => {
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
