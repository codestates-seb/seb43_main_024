import './default/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './pages/Header';
import { Wrapper } from './default/styled';
import Main from './pages/Main';

// login 컴포넌트
import Account from './pages/login/Account';
import LoginForm from './pages/login/Login';
import SignUpForm from './pages/login/Members';
// profile 컴포넌트
import { Profile } from './pages/profile/Profile';
import { Bookmark } from './pages/profile/components/Bookmark';
import { FollowList } from './pages/profile/components/Followlist';
import { MyTIL } from './pages/profile/components/MyTil';
// TilWrite 컴포넌트
import TilWrite from './pages/tilwrite/TilWrite';
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
          {/* 메인 화면 */}
          <Route path="/" element={<Main />} />
          {/* 틸 리스트 화면 */}
          <Route path="/til/list" element={<SearchTil />} />
          <Route path="/til/list/hot" element={<HotTil />} />
          <Route path="/til/list/following" element={<FollowTil />} />
          {/* 로그인, 회원가입 화면 */}
          <Route path="/account" element={<Account />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignUpForm />} />
          </Route>
          {/* 프로필 화면 */}
          <Route path="/profile" element={<Profile />}>
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="followlist" element={<FollowList />} />
            <Route path="mytil" element={<MyTIL />} />
          </Route>
          <Route path="/write" element={<TilWrite />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
