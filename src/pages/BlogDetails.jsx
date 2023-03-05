import { useParams, useNavigate } from "react-router-dom";
import useFetch from '../hooks/useFetch';

const BlogDetails = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const { data: blog, isPending, error } = useFetch(`http://localhost:8000/blogs/${id}`);

    const handleDelete = async () => {
        await fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        });
        navigate('/');
    };

    const handleUpdate = () => {

        navigate(`/update/${id}`);

    };

    return (
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleUpdate} >Update</button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;