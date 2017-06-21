import { connect } from 'react-redux';
import PicPicker from 'components/PicPicker';

import { actions as picActions } from 'store/pics';
import { actions as notesActions, STATE_RECEIVED } from 'store/notes';

const mapStateToProps = ({ pics, notes }) => ({
  firstPic  : pics.firstPic,
  secondPic : pics.secondPic,
  canVote   : notes.state === STATE_RECEIVED
});

const mapDistachToProps = {
  ...picActions,
  ...notesActions
};

export default connect(mapStateToProps, mapDistachToProps)(PicPicker);
