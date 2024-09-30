import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import './editor.module.css';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
  ],
};

type EditorProps = {
  defaultValue?: string;
  onChange: (content: string) => void;
};

const Editor = ({ defaultValue, onChange }: EditorProps) => {
  const { quill, quillRef } = useQuill({ modules, theme: 'snow' });

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(defaultValue || '');
      quill.on('text-change', () => {
        onChange(quill.root.innerHTML)
        
      });
    };
  }, [quill]);

  return (
    <div className='h-96 overflow-hidden'>
      <div ref={quillRef} className='h-full' />
    </div>
  );
};

export default Editor;