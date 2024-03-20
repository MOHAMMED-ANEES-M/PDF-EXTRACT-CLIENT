import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='signup' element={<SignUp />} />
          <Route path="login" element={<SignIn />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
