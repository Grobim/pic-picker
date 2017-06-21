import { getFirebaseRef } from './index';

export const NotesRef = getFirebaseRef().ref('notes');

export default NotesRef;
