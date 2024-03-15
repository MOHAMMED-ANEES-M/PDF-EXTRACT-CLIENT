import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SingnUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='signup' element={<SingnUp />} />
          <Route path="login" element={<SignIn />} />
          {/* <Route path="userslist" element={<UsersList />} >
            <Route index element={<Index />} />
            <Route path="profile" element={<Profile />} />
            <Route path="chatpage/:clientId" element={<ChatPage />} />
            <Route path="clientprofile/:clientId" element={<ClientProfile />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
