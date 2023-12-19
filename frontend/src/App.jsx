import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './pages/Create/Create';
import Update from './pages/Update/Update';
import BlogDetails from './pages/BlogDetails';
import NotFound from './pages/NotFound';
import Preview from './pages/Preview/Preview';
import Login from './pages/Login/Login';
import PrivateRoutes from './helpers/PrivateRoutes';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#570404',
    },
    secondary: {
      main: '#0be46c',
    },
    error: {
      main: '#be210f'
    },
    custom: {
      main:'#7c0a14',
    },
  },
  typography: {
    fontFamily: [
      'Quicksand'
    ].join(','),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='content'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/blogs/:id' element={<BlogDetails />} />
              <Route element={<PrivateRoutes />}>
                <Route path='/create' element={<Create />} />
                <Route path='/update/:id' element={<Update />} />
                <Route path='/preview' element={<Preview />} />
                <Route path='/login' element={<Login />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App;
