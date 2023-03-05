import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './update.css';

const modules = {

  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],

  ],

}

const Update = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [author, setAuthor] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);

  useEffect(() => {

    if (!isPending) {
      setTitle(data.title);
      setContent(data.content);
      setAuthor(data.author);
    }

  }, [isPending, data]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = { title, content, author };

    await fetch('http://localhost:8000/blogs/' + data.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    });

    navigate('/blogs/' + data.id);

  };

  return (
    <div>
      {isPending ? <div>Loading...</div> : <div className="update">
        <h2> Update a blog </h2>
        <form onSubmit={handleSubmit}>
          <label>Blog title </label>
          <input
            value={data.title}
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog body</label>
          <div style={{ height: '30em'}}>
            <ReactQuill defaultValue={data.content} modules={modules} theme="snow" onChange={setContent} style={{height: '90%'}}/>
          </div>
          
          <label>Blog Author:</label>
          <select
            defaultValue={data.author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="Mario">Mario</option>
            <option value="Yoshi">Yoshi</option>
          </select>
          {!isPending && <button >Update blog</button>}
          {isPending && <button disabled >Update blog...</button>}
        </form>
      </div>}

    </div>

  );
}

export default Update;