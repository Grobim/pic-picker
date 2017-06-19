import { getFirebaseStorageRef } from 'firebaseRef';

export const FETCHING = 'PICS_FETCHING';
export const RECEIVED_RAW_PICS = 'PICS_RECEIVED_RAW_PICS';
export const PICKED_TWO_PICS = 'PICS_PICKED_TWO_PICS';

export const STATE_FETCHING = 'FETCHING';

const PIC_COUNT = 86;
const PICS_PER_LINE = 6;
const PICS_PER_COLUMN = 5;
const PICS_PER_FILE = PICS_PER_LINE * PICS_PER_COLUMN;
const PIC_HEIGHT = 600;
const PIC_WIDTH = 400;
const LANDSCAPE_PICS = [
  0, 1, 7, 8, 9, 10, 11, 12, 21, 22, 24, 46, 52, 55, 70, 77, 78, 79, 85
];

export const initImages = () => {
  return (dispatch) => {
    dispatch(fetching());

    Promise.all([
      getFirebaseStorageRef().ref('001.jpg').getDownloadURL(),
      getFirebaseStorageRef().ref('002.jpg').getDownloadURL(),
      getFirebaseStorageRef().ref('003.jpg').getDownloadURL()
    ]).then((urls) => {
      dispatch(receivedRawPics(urls));
      return urls;
    }).then(() => {
      dispatch(picTwoPics());
    });
  };
};

const fetching = () => ({
  type: FETCHING
});

const receivedRawPics = (picsUrl) => ({
  type    : RECEIVED_RAW_PICS,
  payload : picsUrl
});

export const picTwoPics = () => {
  return (dispatch, getState) => {
    const picsUrl = getState().pics.urls;

    const firstPicNum = randomPicCount();
    const firstPicImgStyle = getImgStyleFromNum(firstPicNum, picsUrl);

    const secondPicNum = randomPicCount(firstPicNum);
    const secondPicImgStyle = getImgStyleFromNum(secondPicNum, picsUrl);

    dispatch(pickedTwoPics(firstPicNum, firstPicImgStyle, secondPicNum, secondPicImgStyle));
  };
};

const pickedTwoPics = (firstPicNum, firstPicImgStyle, secondPicNum, secondPicImgStyle) => ({
  type    : PICKED_TWO_PICS,
  payload : {
    firstPic : {
      num      : firstPicNum,
      imgStyle : firstPicImgStyle
    },
    secondPic : {
      num      : secondPicNum,
      imgStyle : secondPicImgStyle
    }
  }
});

const randomPicCount = exclude => {
  let random = Math.floor((Math.random() * PIC_COUNT));

  while (random === exclude) {
    random = Math.floor((Math.random() * PIC_COUNT));
  }

  return random;
};

const getImgStyleFromNum = (num, urls) => {
  const defaultStyle = {
    size             : 'contain',
    backgroundRepeat : 'no-repeat',
    width            : `${PIC_WIDTH}px`,
    height           : `${PIC_HEIGHT}px`,
    zoom             : '0.4'
  };

  return {
    ...defaultStyle,
    backgroundImage    : `url("${getUrlFromNum(num, urls)}")`,
    transform          : getTransformFromNum(num),
    backgroundPosition : getBackgroundPositionFromNum(num)
  };
};

const getUrlFromNum = (num, urls) => {
  return urls[Math.floor(num / PICS_PER_FILE)];
};

const getTransformFromNum = num => {
  return LANDSCAPE_PICS.indexOf(num) > -1 ? 'rotate(90deg)' : 'none';
};

const getBackgroundPositionFromNum = num => {
  const imageId = num % PICS_PER_FILE;
  const xPos = imageId % PICS_PER_LINE;
  const yPos = Math.floor(imageId / PICS_PER_LINE);

  return `-${PIC_WIDTH * xPos}px -${PIC_HEIGHT * yPos}px`;
};

export const actions = {
  initImages,
  picTwoPics
};

const ACTION_HANDLERS = {
  [FETCHING] : (state) => ({
    ...state,
    state : STATE_FETCHING
  }),
  [RECEIVED_RAW_PICS] : (state, { payload }) => ({
    ...state,
    urls : payload
  }),
  [PICKED_TWO_PICS] : (state, { payload }) => ({
    ...state,
    ...payload
  })
};

const initialState = {};
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
