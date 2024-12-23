import AddNote from '../components/AddNote';
import NotesList from '../components/NotesList';

const NotesPage = () => {
  return (
    <div id='notes-page' className='content-containers main-padding max-width-500'>
      <h2 className='margin-t-b'>I mitt huvud just nu:</h2>
      <AddNote />
      <NotesList />
    </div>
  )
}

export default NotesPage;