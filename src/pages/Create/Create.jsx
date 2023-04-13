import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuillEditor from '../../components/ReactQuillEditor/ReactQuillEditor';
import { ReactComponent as EditArticle } from '../../assets/icons/editArticle.svg';
import Modal from '../../components/Modal/Modal';
import './create.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const getContent = (data) => setContent(data);

  const handlePreview = () => {
    sessionStorage.setItem('content', content);
    window.open('/preview', '_blank');
  };

  const closeModal = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blog = { title, content, author };

    setIsPending(true);

    await fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog)
    })
    setIsPending(false);
    navigate('/');

    console.log('New blog added successfully');
  };

  return (
    <div className="create">
      <h2> Add a new blog </h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title </label>
        <input
          type='text'
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog body</label>

        <div style={{ height: '30em' }}>
          <ReactQuillEditor getContent={getContent} />
        </div>

        <button type='button' onClick={handlePreview}>Preview</button>

        {open && (
          <Modal handleSubmit={handleSubmit} closeModal={closeModal} icon={<EditArticle />} />
        )
        }

        <label>Blog Author:</label>
        <select
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="" selected disabled>Please select an option</option>
          <option value='Mario'>Mario</option>
          <option value='Yoshi'>Yoshi</option>
        </select>
        <button className="create_button_add"> {isPending ? 'Adding blog...' : 'Add blog'}</button>
      </form>
    </div>
  );
}

export default Create;