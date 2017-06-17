import { connect } from 'react-redux';
import { HomeView } from 'routes/Home/components/HomeView';
import { connection, disconnect, STATE_LOGGED } from 'store/user';

const mapStateToProps = ({ user }) => ({
  userConnected : user.state === STATE_LOGGED
});

const mapDispatchToProps = {
  connect : connection,
  disconnect
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
