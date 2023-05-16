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

function Header() {
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
          <HeaderLink to="/" light>
            TIL 작성하기
          </HeaderLink>
          <HeaderLink to="/login">로그인</HeaderLink>
          <HeaderLink to="/login" outline>
            회원가입
          </HeaderLink>
          <HeaderLink to="/profile" userInfo>
            <UserPic></UserPic>
            <span>10 tilday 🥚</span>
          </HeaderLink>
        </BtnGroup>
      </InnerWrapper>
    </HeaderWrapper>
  );
}

export default Header;
