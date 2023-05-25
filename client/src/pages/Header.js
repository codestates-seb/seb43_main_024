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
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import API from '../API';

function Header() {
  const { isLogin, setLoginStatus } = useStore();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwt_decode(token);
      const memberId = decodedToken.memberId;
      const response = await API.get(`/members/${memberId}`);
      const data = response.data;
      setProfileData(data);
    } catch (error) {
      console.error('프로필 데이터를 가져오는 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post(`${process.env.REACT_APP_API_URL}/logout`); //api 요청
      localStorage.removeItem('token'); // 로컬 스토리지에서 액세스 토큰 삭제
      localStorage.removeItem('memberId');
      setLoginStatus(false);

      alert('로그아웃이 완료되었습니다.');
      localStorage.removeItem('token');
      localStorage.removeItem('memberId');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
    window.location.reload();
  };

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
          </TopNav>
        </NavLogo>

        <BtnGroup>
          <HeaderLink to="/write" light>
            TIL 작성하기
          </HeaderLink>

          {isLogin ? (
            <>
              <HeaderLink onClick={handleLogout}>로그아웃</HeaderLink>
              {profileData && (
                <HeaderLink to="/profile/mytil" userInfo>
                  <UserPic
                    src={
                      profileData.img ? profileData.img : '/defaultprofile.png'
                    }
                    alt="프로필 사진"
                  />
                  <span>{profileData.nickName}</span>
                </HeaderLink>
              )}
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
