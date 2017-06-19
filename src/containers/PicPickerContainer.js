import { connect } from 'react-redux';
import PicPicker from 'components/PicPicker';

import { actions as picActions } from 'store/pics';

const mapStateToProps = ({ pics }) => ({
  firstPic : pics.firstPic,
  secondPic : pics.secondPic
});

const mapDistachToProps = {
  ...picActions
};

export default connect(mapStateToProps, mapDistachToProps)(PicPicker);
