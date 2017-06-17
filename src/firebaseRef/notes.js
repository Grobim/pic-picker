import { getFirebaseRef } from './index';

const NotesRef = getFirebaseRef().ref('notes');

export default NotesRef;
