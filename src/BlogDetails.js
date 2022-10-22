import { useParams, useHistory } from "react-router-dom";
import useFetch from './useFetch';

const BlogDetails = () => {
    const { id } = useParams();

    const { data: blog, isPendging, error } = useFetch(`http://localhost:8000/blogs/${id}`);
    const history = useHistory();

    const handleDelete = async () => {
        await fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        });
        history.push('/');
    };

    const handleUpdate = async () => {
        blog.body = 'AsSaaSSaaSSAAA';

        await fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog),
        });

        // window.location.reload();
    };
   
    return (
        <div className="blog-details">
            { isPendging && <div>Loading...</div> }
            { error && <div>{error}</div> }
            { blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div> 
                    <button onClick={handleDelete}>Delete</button>
                    <button onClick={handleUpdate}>Update</button>
                </article>
            ) }
        </div>
    );
};

export default BlogDetails;