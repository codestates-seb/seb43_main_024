import { HeaderLink } from '../../../default/styled';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
        const response = await axios.get('http://localhost:3001/profile');
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

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <UserProfileWrapper>
      <img src={profileData.profilePicture} alt="user profile" />
      <h2>{profileData.nickName}</h2>
      <h4>{profileData.rank}</h4>
      <HeaderLink>+팔로우</HeaderLink>
      <p>{profileData.about_me}</p>
    </UserProfileWrapper>
  );
}
