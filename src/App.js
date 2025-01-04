import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Collection from './Pages/Collection';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Allprod from './Components/Allprod';
import Login from './Components/Login';
import Reg from './Components/Reg';
import { useLocation } from 'react-router-dom';
import Viewprod from './Components/Viewprod';
import Verifyemail from './Pages/Verifyemail';
import Admin from './Pages/Admin';
import Addprod from './Components/Addprod';
import Viewallprod from './Components/Viewallprod';
import Viewusers from './Components/Viewusers';
import Viewallorders from './Components/Viewallorders';
import Editprof from './Components/Editprof';
import Forgotp from './Components/Forgotp';
import Changep from './Components/Changep';
import Cart from './Components/Cart';
import Payment from './Components/Payment';
import Success from './Components/Success';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const location = useLocation()
  return (
    <div className="App">


      {!['/log', '/reg', '/admin', '/addp', '/viewallp', '/viewu', '/viewallprod', '/editprof', '/viewallord'].includes(location.pathname) && (
        <>
          <Header />
        </>
      )}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='col' element={<Collection />} />
        <Route path='abt' element={<About />} />
        <Route path='con' element={<Contact />} />
        <Route path='allprod' element={<Allprod />} />
        <Route path='log' element={<Login />} />
        <Route path='reg' element={<Reg />} />
        <Route path='viewp' element={<Viewprod />} />
        <Route path='verify-email' element={<Verifyemail />} />
        <Route path='admin'  element={
            <ProtectedRoute>
            <Admin/>
            </ProtectedRoute>
          } />
        <Route path='addp' element={<Addprod />} />
        <Route path='viewallp' element={<Viewallprod />} />
        <Route path='viewu' element={<Viewusers />} />
        <Route path='viewallord' element={<Viewallorders />} />
        <Route path='editprof' element={<Editprof />} />
        <Route path='forgotp' element={<Forgotp />} />
        <Route path='changep' element={<Changep />} />
        <Route path='cart'  element={
            <ProtectedRoute>
              <Cart/>
            </ProtectedRoute>
          } />
        <Route path='pay'  element={
            <ProtectedRoute>
             <Payment/>
            </ProtectedRoute>
          } />
        <Route path='success'  element={
            <ProtectedRoute>
             <Success/>
            </ProtectedRoute>
          } />


      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
     
      />

    </div>
  );
}

export default App;
