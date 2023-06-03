import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './pages/Create/Create';
import Update from './pages/Update/Update';
import BlogDetails from './pages/BlogDetails';
import NotFound from './pages/NotFound';
import Preview from './pages/Preview/Preview';
import PrivateRoutes from './helpers/PrivateRoutes';

const App = () => {
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
              <Route path="/preview" element={<Preview />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
