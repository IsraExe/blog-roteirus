import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {
    const { data: blogs, isPendging, error } = useFetch('http://localhost:8000/blogs')


    return ( 
        <div className="home">
            {
                error && <div>{error}</div>
            }
            {
                isPendging && <div>Loading...</div>
            }
            {
                blogs && <BlogList blogs = {blogs} title="All blogs"/> // if blogs is null, it will neve read the second argument. But if it is not null, it will show the component
            }
        </div>
     );
}
 
export default Home;