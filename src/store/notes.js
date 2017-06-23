import { NotesRef } from 'firebaseRef';
class EloRank {
  constructor(k) {
    this.k = k || 32;
  }

  setKFactor(k) {
    this.k = k;
  }
  getKFactor() {
    return this.k;
  }

  getExpected(a, b) {
    return 1/(1+Math.pow(10,((b-a)/400)));
  }
  updateRating(expected, actual, current) {
    return Math.round(current+ this.k*(actual-expected));
  }
}

export const FETCHING = 'NOTES_FETCHING';
export const RECEIVED = 'NOTES_RECEIVED';

export const STATE_FETCHING = 'FETCHING';
export const STATE_RECEIVED = 'RECEIVED';

const elo = new EloRank();

export const initNotes = () => {
    return dispatch => {
        dispatch(fetching());

        NotesRef.on('value', snap => {
            dispatch(receivedNotes(snap.val() || {}));
        });
    };
};

const fetching = () => ({
    type : FETCHING
});

const receivedNotes = (notes) => ({
    type    : RECEIVED,
    payload : notes
});

export const pickFirstPic = () => {
    return (dispatch, getState) => {
        const firstPicId = getState().pics.firstPic.num;
        const firstPicNote = getState().notes.notes[firstPicId] || 1200;

        const secondPicId = getState().pics.secondPic.num;
        const secondPicNote = getState().notes.notes[secondPicId] || 1200;

        const expectedScoreA = elo.getExpected(firstPicNote, secondPicNote);
        const expectedScoreB = elo.getExpected(secondPicNote, firstPicNote);

        updateNote(firstPicId, elo.updateRating(expectedScoreA, 1, firstPicNote));
        updateNote(secondPicId, elo.updateRating(expectedScoreB, 0, secondPicNote));
    };
};

export const pickSecondPic = () => {
    return (dispatch, getState) => {
        const firstPicId = getState().pics.firstPic.num;
        const firstPicNote = getState().notes.notes[firstPicId] || 1200;

        const secondPicId = getState().pics.secondPic.num;
        const secondPicNote = getState().notes.notes[secondPicId] || 1200;

        const expectedScoreA = elo.getExpected(firstPicNote, secondPicNote);
        const expectedScoreB = elo.getExpected(secondPicNote, firstPicNote);

        updateNote(firstPicId, elo.updateRating(expectedScoreA, 0, firstPicNote));
        updateNote(secondPicId, elo.updateRating(expectedScoreB, 1, secondPicNote));
    };
};

const updateNote = (picId, newNote) => {
    NotesRef.child(picId).set(newNote);
};

export const actions = {
    initNotes,
    pickFirstPic,
    pickSecondPic
};

const ACTION_HANDLERS = {
    [FETCHING] : state => ({
        ...state,
        state : STATE_FETCHING
    }),
    [RECEIVED] : (state, { payload }) => ({
        ...state,
        notes : payload,
        state : STATE_RECEIVED
    })
};

const initialState = {
    notes : []
};
export default function notesReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
