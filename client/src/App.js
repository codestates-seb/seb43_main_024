import './default/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
// login 컴포넌트
import Login from './pages/login/Login';
// profile 컴포넌트
import { Profile } from './pages/profile/Profile';
import { Bookmark } from './pages/profile/components/Bookmark';
import { FollowList } from './pages/profile/components/Followlist';
import { MyTIL } from './pages/profile/components/MyTil';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="followlist" element={<FollowList />} />
            <Route path="mytil" element={<MyTIL />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function Main() {
  return <h2>Main</h2>;
}

export default App;
