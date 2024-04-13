import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange }) => {
    const [editorHtml, setEditorHtml] = useState(value);

    const handleChange = html => {
      setEditorHtml(html);
      onChange(html);
    };

    return (
        <ReactQuill
            theme="snow"
            value={editorHtml}
            onChange={handleChange}
            modules={RichTextEditor.modules}
            formats={RichTextEditor.formats}
            placeholder='write description......'
            className='mt-2'
            style={{ minHeight: '150px' }}
        />
    );
};

RichTextEditor.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
};

RichTextEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

export default RichTextEditor;
