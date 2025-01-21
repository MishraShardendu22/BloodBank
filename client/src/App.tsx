import { Route, Routes } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
