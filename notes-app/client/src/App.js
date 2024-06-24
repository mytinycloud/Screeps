import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState('');

    useEffect(() => {
        axios.get('/notes')
            .then(response => setNotes(response.data))
            .catch(error => console.error(error));
    }, []);

    const addNote = () => {
        axios.post('/notes', { text: note })
            .then(response => setNotes([...notes, response.data]))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>Notes</h1>
            <input 
                type="text" 
                value={note} 
                onChange={e => setNote(e.target.value)} 
            />
            <button onClick={addNote}>Add Note</button>
            <ul>
                {notes.map((note, index) => (
                    <li key={index}>{note.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
