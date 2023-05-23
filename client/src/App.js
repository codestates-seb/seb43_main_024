import './default/style.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
//TilList, TilPost, TilEdit 컴포넌트
import SearchTil from './pages/tillist/SearchTil';
import HotTil from './pages/tillist/HotTil';
import FollowTil from './pages/tillist/FollowTil';
import TilPost from './pages/tilpost/TilPost';
import TilEdit from './pages/tilpost/TilEdit';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const isLoggedIn = storedIsLoggedIn === 'true';

    if (
      !isLoggedIn &&
      (location.pathname === '/profile' ||
        location.pathname === '/til/list/following' ||
        location.pathname === '/write')
    ) {
      navigate('/account/login');
    }
  }, [location.pathname]);
  
  return (
    <>
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
          <Route path="/edit/:tilId" element={<TilEdit />} />
          <Route path="/til/:tilId" element={<TilPost />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
