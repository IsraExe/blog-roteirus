import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import './editor.module.css';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],
    ['link', 'image', 'video'],
  ],
};

const ReactQuillEditor = ({ defaultValue, getContent }: any) => {
  const [content, setContent] = useState('');

  useEffect(() => getContent(content), [getContent, content]);

  return (
    <div style={{ height: '30em' }}>
      <ReactQuill defaultValue={defaultValue} modules={modules} theme='snow' onChange={setContent} style={{ height: '90%' }} />
    </div>
  );
};

export default ReactQuillEditor;