document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('note-form');
    const notesList = document.getElementById('notes-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const response = await fetch('/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        const note = await response.json();
        addNoteToDOM(note);

        form.reset();
    });

    async function fetchNotes() {
        const response = await fetch('/notes');
        const notes = await response.json();
        notes.forEach(addNoteToDOM);
    }

    function addNoteToDOM(note) {
        const div = document.createElement('div');
        div.classList.add('note');
        div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
        notesList.appendChild(div);
    }

    fetchNotes();
});
