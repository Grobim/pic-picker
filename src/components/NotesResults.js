import React from 'react';
import PropTypes from 'prop-types';
import './NotesResults.scss';

export default class NotesResults extends React.Component {
    static propTypes = {
        notes: PropTypes.array.isRequired
    };

    goToVotes () {
        this.props.router.push('');
    }
    goToVotes = this.goToVotes.bind(this);

    render () {
        const notesItems = this.props.notes.map((note, id) => (
            <tr key={note.id}>
                <td>
                    {id + 1}
                </td>
                <td>
                    {note.id + 1}
                </td>
                <td>
                    {note.file}
                </td>
                <td>
                    {note.line}
                </td>
                <td>
                    {note.column}
                </td>
                <td>
                    <b>{note.note}</b>
                </td>
            </tr>
            // return <li key={note.id}>{note.id + 1} (File {note.file}, Line {note.line}, Column {note.column}) - <b>{note.note}</b></li>
        ));

        return (
            <div>
                <h4>Results!</h4>
                <button className='btn' onClick={this.goToVotes}>
                    Go to votes
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Id</th>
                            <th>File</th>
                            <th>Line</th>
                            <th>Column</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notesItems}
                    </tbody>
                </table>
            </div>
        );
    }
}
