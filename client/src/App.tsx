import { Route, Routes } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
