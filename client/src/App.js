import './default/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import { Wrapper } from './default/styled';
import Main from './pages/Main';
// login 컴포넌트
import Login from './pages/login/Login';
// profile 컴포넌트
import { Profile } from './pages/profile/Profile';
import { Bookmark } from './pages/profile/components/Bookmark';
import { FollowList } from './pages/profile/components/Followlist';
import { MyTIL } from './pages/profile/components/MyTil';
import SearchTil from './pages/tillist/SearchTil';
import HotTil from './pages/tillist/HotTil';
import FollowTil from './pages/tillist/FollowTil';
//import TilPost from './pages/tilpost/TilPost';

function App() {
  return (
    <Router>
      <Header />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/til/list" element={<SearchTil />} />
          <Route path="/til/list/hot" element={<HotTil />} />
          <Route path="/til/list/following" element={<FollowTil />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="followlist" element={<FollowList />} />
            <Route path="mytil" element={<MyTIL />} />
          </Route>
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
