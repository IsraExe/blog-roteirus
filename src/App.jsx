import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Create'
import Update from './Update'
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import PrivateRoutes from './helpers/PrivateRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/create" element={<Create />} />
              <Route path="/update/:id" element={<Update />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
