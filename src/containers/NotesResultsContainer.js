import { connect } from 'react-redux';

import NotesResults from 'components/NotesResults';

import { PICS_PER_FILE, PICS_PER_LINE } from 'store/pics';

const mapStateToProps = ({ notes }) => ({
    notes : notes.notes.map((note, id) => {
        const imageId = id % PICS_PER_FILE;

        return {
            id,
            note,
            file   : `00${Math.floor(id / PICS_PER_FILE) + 1}.jpg`,
            line   : Math.floor(imageId / PICS_PER_LINE) + 1,
            column : imageId % PICS_PER_LINE + 1
        };
    }).sort((note1, note2) => note2.note - note1.note)
});

export default connect(mapStateToProps)(NotesResults);
