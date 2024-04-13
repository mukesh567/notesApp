import moment from 'moment/moment'
import React from 'react'
import { deleteNote } from '../services/api.js'
import { toast } from 'react-toastify'
import DetailPageModal from './DetailPageModal.jsx'

const Note = ({ note, setRefreshList }) => {
   

    const handleDelete = async (id) => {

        const result = await deleteNote({
            note_id: id
        })

        if (result.data.status === 200) {
            setRefreshList(new Date())
            toast.success("Note Deleted!")
        } else {
            toast.error("Failed to delete , please try again!")
        }
    }

    


    return (
        <>
            <div
                className='col-sm-3 mx-3 my-2 alert text-white '
                style={{ backgroundColor: `${note.color}` }}
            >

                <div className="card-header">
                    Your Note :
                </div>

                <div className="card-body">

                    <h4 className='card-title' style={{ marginBottom: '10px', marginTop: '10px' }} >{note.title}</h4>
                    <p className="card-text">{moment(note.date).fromNow()}</p>

                </div>

                <div className="actionButtons" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px' }}>

                    <div className="deleteButton">
                        <button
                            style={{ background: 'red', border: 'none', borderRadius: '20px', color: '#fff' }}
                            onClick={() => handleDelete(note._id)}>
                            Delete
                        </button>
                    </div>

                    <div className="Details" style={{ position: 'fixed', right: 42, bottom: 15, zIndex: 1030 }}>
                        <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target={`#detailModal-${note._id}`}
                            style={{ background: 'darkGreen', border: 'none', borderRadius: '20px', color: 'white' }}
                            
                        >
                            Details
                        </button>
                    </div>

                </div>
            </div>
            <DetailPageModal note={note} modalId={`detailModal-${note._id}`} />
        </>
    )
}

export default Note

