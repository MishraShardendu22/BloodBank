import { Route, Routes } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Landing from './Pages/Landing';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Home from './Pages/Home';
import Protected from './components/Route/Protected';
import UnProtected from "./components/Route/Unprotected"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={ <Protected> <Home /> </Protected> }/>
        <Route path="/" element={ <UnProtected> <Landing /> </UnProtected> } /> 
        <Route path="/login" element={<UnProtected> <Login /> </UnProtected>} />
        <Route path="/register" element={ <UnProtected> <Register /> </UnProtected> } />
        <Route path="*" element={ <UnProtected> <NotFound /> </UnProtected> } />
      </Routes>
    </div>
  );
};

export default App;
