import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import Note from '../components/Note.jsx'
import AddNoteModal from '../components/AddNoteModal.jsx'
import { useNavigate } from 'react-router-dom'
import { getNoteList } from '../services/api.js'



const Home = () => {

  const [list, setList] = useState([])
  const [refreshList, setRefreshList] = useState();
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {

    const findUser = localStorage.getItem("user");
    if (!findUser) {
      navigate('/login')
    }

    fetchNoteList();

  }, [refreshList])

  useEffect(() => {

    if (searchText === '') {
      setFilteredList(list);
    } else {
      const filterNote = list.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase().trim()));
      setFilteredList(filterNote)
    }

  }, [list, searchText])



  const fetchNoteList = async () => {

    const result = await getNoteList();

    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.notes.reverse());
    }
  }


  return <>
    <Header searchText={searchText} setSearchText={setSearchText} />

    <div className="container ">
      <div className="row justify-content-md-center mt-4">

        {
          filteredList.map((note) => <Note note={note} key={note._id} setRefreshList={setRefreshList} />)
        }

        {
          filteredList.length === 0 && (
            <div className="notFoundNotes">
              No Notes
            </div>
          )
        }

      </div>
    </div>

    <div style={{ position: 'fixed', right: 50, bottom: 50, zIndex: 1030 }}>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className='btn btn-outline-light'
      >
        Add
      </button>
    </div>

    <AddNoteModal setRefreshList={setRefreshList} />

  </>
}

export default Home

