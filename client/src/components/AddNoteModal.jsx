import React, { useState } from 'react'
import { createNote } from '../services/api.js';
import { toast } from 'react-toastify';
import RichTextEditor from './RichTextEditor.jsx';

const AddTodoModal = ({ setRefreshList }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [link, setLink] = useState({ url: "", type: "" });
    const [color, setColor] = useState("#dbe9c8");


    const handleDescriptionChange = html => {
        const plainText = html.replace(/<[^>]+>/g, '');
        setDesc(plainText);
    };

    const handleLinkAddition = () => {
        // Validate link here
        const isVideoLink = isVideoURL(link.url);
        const isImageLink = isImageURL(link.url);

        if (isVideoLink || isImageLink) {
            setLink({ url: link.url, type: isVideoLink ? "video" : "image" });
        } else {
            toast.error("Invalid link. Please enter a valid video or image link.");
        }
    };

    // Function to check if the URL is a video link
    const isVideoURL = (url) => {
        return (
            url.includes("youtube.com") ||
            url.includes("youtu.be") ||
            url.includes("vimeo.com") ||
            url.match(/\.(mp4|ogg|webm)$/) !== null
        );
    };

    // Function to check if the URL is an image link
    const isImageURL = (url) => {
        if (url.includes("imgurl=")) {
            // Extract the image URL from the parameter
            const imgurlIndex = url.indexOf("imgurl=") + 7; 
            const imgurlEndIndex = url.indexOf("&", imgurlIndex);
            if (imgurlEndIndex !== -1) {
                const imgUrl = decodeURIComponent(url.substring(imgurlIndex, imgurlEndIndex));
                return imgUrl.match(/\.(jpeg|jpg|gif|png)$/) !== null;
            }
        }
        
        // Check for other patterns if the URL doesn't contain the imgurl parameter
        return (
            url.includes("pexels.com/photo/") ||
            url.includes("unsplash.com/photos/") ||
            // Add more patterns for other image hosting platforms
            url.match(/\.(jpeg|jpg|gif|png)$/) !== null
        );
    };




    const handleNoteSubmit = async (e) => {
        e.preventDefault();

        if (desc === '' || title === '') {
            toast.error("Note description/title is required");
            return;
        }

        const result = await createNote({
            title: title,
            desc: desc,
            videolink: link.type === "video" ? link.url : "",
            imagelink: link.type === "image" ? link.url : "",
            color: color
        })

        if (result.status === 200 && result.data.status === 200) {
            toast.success("Note added!")
            setRefreshList(new Date())
            setTitle("")
            setDesc("")
            setLink({ url: "", type: "" });
            setColor("#dbe9c8")

        } else {
            toast.error(result.data.message);
        }
    }

    return (
        <div className="modal mt-5 mb-5" id='exampleModal'>
            <div className="modal-dialog" role='document'>
                <div className="modal-content">

                    <div className="modal-header">
                        <div className="modal-title">Add New Note</div>
                        <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label='close'>
                            <span arial-hidden="true"></span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-group">

                            <input
                                type="text"
                                className='form-control mt-2'
                                placeholder="Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />

                            <RichTextEditor value={desc} onChange={handleDescriptionChange} />

                
                            <div className="input-group mt-2">
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder="Enter video or image link"
                                    value={link.url}
                                    onChange={e => setLink({ url: e.target.value, type: "" })}
                                />
                                <button className="btn btn-primary" type="button" onClick={handleLinkAddition}>Add</button>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>

                                <label htmlFor="color" className='mt-3'>Choose color: </label>
                                <input
                                    type="color"
                                    className='mt-3'
                                    placeholder="color"
                                    id='color'
                                    value={color}
                                    onChange={e => setColor(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className=' btn btn-secondary' onClick={handleNoteSubmit} data-bs-dismiss="modal" >Save Note</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddTodoModal

