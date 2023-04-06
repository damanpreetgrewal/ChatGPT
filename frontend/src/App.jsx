import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            {!user ? (
              <>
                <Route path='/' element={<Login />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </>
            ) : (
              <>
                {/* other auth required routes */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
