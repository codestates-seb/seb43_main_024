import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  HeaderWrapper,
  InnerWrapper,
  TextLogo,
  BtnGroup,
  HeaderLink,
  UserPic,
  TapMenu,
  TopNav,
  NavLogo,
} from '../default/styled';
import useStore from '../default/useStore';
import axios from 'axios';
import { useEffect } from 'react';

function Header() {
  const { isLogin, setLoginStatus } = useStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`); //api 요청
      localStorage.removeItem('token'); // 로컬 스토리지에서 액세스 토큰 삭제
      setLoginStatus(false);

      alert('로그아웃이 완료되었습니다.');
      navigate('/account/login');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
    window.location.reload();
  };

  // page가 변경될때마다, token의 유무를 근거로 LoginStatus를 관리합니다.
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const hasToken = storedToken !== null;

    if (hasToken) {
      setLoginStatus(true);
    }
  }, [location.pathname]);

  return (
    <HeaderWrapper>
      <InnerWrapper flex>
        <NavLogo>
          <Link to="/">
            <TextLogo>TilTile</TextLogo>
          </Link>

          <TopNav>
            <NavLink to="/til/list">
              <TapMenu onClick={() => handleNavigation('/til/list')}>
                탐색
              </TapMenu>
            </NavLink>
            <NavLink to="/til/list/hot">
              <TapMenu onClick={() => handleNavigation('/til/list/hot')}>
                핫틸
              </TapMenu>
            </NavLink>
            <NavLink to="/til/list/following" activeClassName="active">
              <TapMenu>팔로우틸</TapMenu>
            </NavLink>
          </TopNav>
        </NavLogo>

        <BtnGroup>
          <HeaderLink to="/write" light>
            TIL 작성하기
          </HeaderLink>

          {isLogin ? (
            <>
              <HeaderLink onClick={handleLogout}>로그아웃</HeaderLink>
              <HeaderLink to="/profile" userInfo>
                <UserPic></UserPic>
                <span>{`${isLogin}`}</span>
              </HeaderLink>
            </>
          ) : (
            <>
              <HeaderLink to="/account/login">로그인</HeaderLink>
              <HeaderLink to="/account/signup" outline>
                회원가입
              </HeaderLink>
            </>
          )}
        </BtnGroup>
      </InnerWrapper>
    </HeaderWrapper>
  );
}

export default Header;
