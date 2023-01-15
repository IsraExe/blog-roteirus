import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from './useFetch';

const Update = () => {
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);
    const [author, setAuthor] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();

    const { data, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);

    useEffect(() => {

        if (!isPending) {
            setTitle(data.title);
            setBody(data.body);
            setAuthor(data.author);
        }

    }, [isPending, data]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const blog = { title, body, author };

        console.log(blog);

        await fetch('http://localhost:8000/blogs/' + data.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog),
        });

        navigate('/blogs/' + data.id);

    };

    return (
        <div>
            {isPending ? <div>Loading...</div> : <div className="create">
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
                    <textarea
                        defaultValue={data.body}
                        required
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                    <label>Blog Author:</label>
                    <select
                        defaultValue={data.author}
                        onChange={(e) => setAuthor(e.target.value)}
                    >
                        <option value="Mario">Mario</option>
                        <option value="Yoshi">Yoshi</option>
                    </select>
                </form>
            </div>}

        </div>

    );
}

export default Update;