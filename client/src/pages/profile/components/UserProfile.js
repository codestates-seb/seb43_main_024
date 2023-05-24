import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserProfileWrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 70px;

  display: flex;
  flex-direction: column;

  width: 355px;
  height: 100%;

  background: white;
  background: #ffffff;
  border-right: 1px solid #ededed;

  img {
    width: 150px;
    border-radius: 100%;
    background: black;
  }
`;

export function UserProfile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const memberId = localStorage.getItem('memberId'); // 토큰의 값으로부터 Id를 가져온다.
        const response = await axios.get(`/members/${memberId}`);
        const data = response.data;
        setProfileData(data);
        console.log('/profile에 대한 get요청이 완료되었습니다.');
      } catch (error) {
        console.error(
          '프로필 데이터를 가져오는 중 오류가 발생했습니다.',
          error
        );
      }
    };
    fetchProfileData();
  }, []);

  // null 에 대한 loading 처리
  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <UserProfileWrapper>
      <img
        src={profileData.img ? profileData.img : '/defaultprofile.png'}
        alt="user profile"
      />
      <h2>{profileData.nickName}</h2>
      <p>
        {profileData.aboutMe
          ? profileData.aboutMe
          : `저는 개발자가 되기위한 ${profileData.nickName} 입니다`}
      </p>
      <Link to="/editpass">
        <button>정보수정</button>
      </Link>
    </UserProfileWrapper>
  );
}
