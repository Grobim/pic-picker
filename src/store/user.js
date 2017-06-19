import { getFirebaseAuth, getGoogleProvider } from 'firebaseRef';

export const USER_CONNECTING = 'USER_CONNECTING';
export const USER_CONNECTED = 'USER_CONNECTED';
export const USER_DISCONNECT = 'USER_DISCONNECT';

export const STATE_UNLOGGED = 'UNLOGGED';
export const STATE_LOGGING = 'LOGGING';
export const STATE_LOGGED = 'LOGGED';

export const connection = () => {
  return (dispatch) => {
    dispatch(connecting());

    getFirebaseAuth().signInWithPopup(getGoogleProvider()).then((result) => {
      dispatch(connected(result));
    }, () => {
      dispatch(disconnected());
    });
  };
};

const connecting = () => ({
  type : USER_CONNECTING
});

const connected = (result) => ({
  type    : USER_CONNECTED,
  payload : {
    ...result
  }
});

export const disconnect = () => {
  return (dispatch) => {
    getFirebaseAuth().signOut().then(() => {
      dispatch(disconnected());
    });
  };
};

const disconnected = () => ({
  type: USER_DISCONNECT
});

export const actions = {
  connection,
  disconnect
};

const ACTION_HANDLERS = {
  [USER_CONNECTING]: (state) => ({
    ...state,
    state : STATE_LOGGING
  }),
  [USER_CONNECTED] : (state, { payload }) => ({
    ...state,
    ...payload,
    state : STATE_LOGGED
  }),
  [USER_DISCONNECT] : (state) => (initialState)
};

const initialState = {
  state : STATE_UNLOGGED
};
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
