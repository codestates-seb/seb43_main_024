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

function Header() {
  const { isLogin } = useStore();

  return (
    <HeaderWrapper>
      <InnerWrapper flex>
        <NavLogo>
          <Link to="/">
            <TextLogo>TilTile</TextLogo>
          </Link>

          <TopNav>
            <NavLink to="/">
              <TapMenu>탐색</TapMenu>
            </NavLink>
            <NavLink to="/">
              <TapMenu>핫틸</TapMenu>
            </NavLink>
            <NavLink to="/">
              <TapMenu>팔로우틸</TapMenu>
            </NavLink>
          </TopNav>
        </NavLogo>

        <BtnGroup>
          {/* islogin? 작성창으로 이동 : 로그인으로 이동 */}
          <HeaderLink to="/" light>
            TIL 작성하기
          </HeaderLink>

          {isLogin ? (
            <HeaderLink to="/profile" userInfo>
              <UserPic></UserPic>
              <span>닉네임,tilday</span>
            </HeaderLink>
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
