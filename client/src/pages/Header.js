import { NavLink, Link } from 'react-router-dom';
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
import Cookies from 'js-cookie';

function Header() {
  const { isLogin, setLoginStatus } = useStore();
  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      window.sessionStorage.removeItem('access_token'); // session.access_toekn토큰 삭제
      Cookies.remove('access_token'); // cookie.access_token 삭제
      Cookies.remove('refresh_token'); // cookie.refresh_token 삭제

      setLoginStatus(false);
      console.log('로그아웃 컴플리트');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HeaderWrapper>
      <InnerWrapper flex>
        <NavLogo>
          <Link to="/">
            <TextLogo>TilTile</TextLogo>
          </Link>

          <TopNav>
            <NavLink to="/til/list">
              <TapMenu>탐색</TapMenu>
            </NavLink>
            <NavLink to="/til/list/hot">
              <TapMenu>핫틸</TapMenu>
            </NavLink>
            <NavLink to="/til/list/following">
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
              <HeaderLink to="/profile" userInfo>
                <UserPic></UserPic>
                <span>닉네임,tilday</span>
              </HeaderLink>
              <HeaderLink onClick={handleLogout}>logout</HeaderLink>
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
