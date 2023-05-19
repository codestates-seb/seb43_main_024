import './default/style.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import useStore from './default/useStore';

import Header from './pages/Header';
import { Wrapper } from './default/styled';
import Main from './pages/Main';

// 모달
import Modal from './default/Modal';

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

//TODO: islogin으로 상태를 관리하여, 올바르게 route 될수 있도록 한다.

function App() {
  const { isLogin } = useStore();
  const location = useLocation();

  if (
    !isLogin &&
    (location.pathname === '/profile' ||
      location.pathname === '/til/list/following' ||
      location.pathname === '/write')
  ) {
    return <Navigate to="/account/login" />;
  }

  return (
    <Router>
      <Modal />
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
