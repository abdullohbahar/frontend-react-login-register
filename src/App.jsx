import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import Welcome from './page/Welcome';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
