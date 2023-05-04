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
            { (
              <>
                <Route path='/' element={<Home />} />
                {/* <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} /> */}
              </>
            // ) : (
            //   <>
            //     {/* other auth required routes */}
            //     <Route path='/' element={<Home />} />
            //     {/* should show some feedback to the user that he's already logged in */}
            //     <Route path='/login' element={<Login />} />
            //   </>
            )}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
