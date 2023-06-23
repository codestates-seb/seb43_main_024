import { useNavigate, useLocation } from 'react-router-dom';
import {
  NavStyleMobile,
  DropdownWrapper,
  DropdownBorder,
} from '../../default/styled';
import useStore from '../../default/useStore';
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import API from '../../API';

function Dropdown({ closeMemu }) {
  const { isLogin, setLoginStatus } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
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
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setLoginStatus(false);
      alert('로그아웃이 완료되었습니다.');
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
    <DropdownWrapper>
      <NavStyleMobile
        to="/til/list"
        onClick={() => handleNavigation('/til/list')}
      >
        탐색
      </NavStyleMobile>
      <NavStyleMobile
        to="/til/hotlist"
        onClick={() => handleNavigation('/til/hotlist')}
      >
        핫틸
      </NavStyleMobile>
      <DropdownBorder>
        <NavStyleMobile to="/write" light onClick={closeMemu}>
          TIL 작성하기
        </NavStyleMobile>
      </DropdownBorder>

      {isLogin ? (
        <>
          {profileData && (
            <NavStyleMobile to="/profile/mytil" onClick={closeMemu}>
              마이페이지
            </NavStyleMobile>
          )}
          <NavStyleMobile onClick={handleLogout}>로그아웃</NavStyleMobile>
        </>
      ) : (
        <>
          <NavStyleMobile to="/account/login" onClick={closeMemu}>
            로그인
          </NavStyleMobile>
          <NavStyleMobile to="/account/signup" outline onClick={closeMemu}>
            회원가입
          </NavStyleMobile>
        </>
      )}
    </DropdownWrapper>
  );
}

export default Dropdown;
