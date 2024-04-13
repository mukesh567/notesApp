import React from 'react'

const DetailPageModal = ({ note, modalId }) => {

    const renderMedia = () => {
        
        if (note.videolink) {

            // Extract video ID from the YouTube URL
            const urlParts = note.videolink.split('/');
            const videoId = urlParts.pop().split('?')[0];

            return (
                <iframe
                    width="300"
                    height="200"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            );
        } else if (note.imagelink) {
            return <img src={note.imagelink} alt="Image" style={{ maxWidth: '100%' }} />;
        } else {
            return <p>No video or image provided.</p>;
        }
    };

    return (
        <div className="modal mt-2" id={modalId} >
            <div className="modal-dialog" role='document'>
                <div className="modal-content">

                    <div className="modal-header">
                        <div className="modal-title">Your Notes Details</div>
                        <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label='close'>
                            <span arial-hidden="true"></span>
                        </button>
                    </div>

                    <div className="modal-body" >

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                            <h2>Title : {note.title}</h2>
                            <p>Description : {note.desc}</p>

                            {renderMedia()}

                            <p style={{ marginTop: '15px' }}>Your note's background color is : {note.color}</p>

                        </div>

                    </div>

                    <div className="modal-footer">
                        <button className=' btn btn-secondary' data-bs-dismiss="modal" >Close</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DetailPageModal