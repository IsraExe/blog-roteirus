import { useState } from "react";
import { useHistory } from "react-router-dom";

const Update = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Yoshi');
    const [isPendging, setIsPending] = useState(false);
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault() 
        const blog = { title, body, author }

        setIsPending(true)

        await fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog)
        })
        setIsPending(false)
        // history.go(-1)
        history.push('/')
        console.log('New blog added successfully')
    };

    return (
        <div className="create">
            <h2> Update a blog </h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body</label>
                <textarea 
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog Author:</label>
                <select
                value={author}
                onChange={ (e) => setAuthor(e.target.value)}
                >
                    <option value="Mario">Mario</option>
                    <option value="Yoshi">Yoshi</option>
                </select>
                {!isPendging && <button >Add blog</button>}
                {isPendging && <button disabled >Adding blog...</button>}
            </form>
        </div>
    );
}

export default Update;