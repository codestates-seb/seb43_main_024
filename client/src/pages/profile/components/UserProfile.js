import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../API';
import jwt_decode from 'jwt-decode';
import { UserProfileWrapper, ImgBox } from '../../../default/styled';
import IconPencil from '../../../default/image/ico-pencil.svg';
import TilTierText from '../../../default/tilComponents/TilTierText';

export function UserProfile() {
  const [profileData, setProfileData] = useState(null);
  const oauthToken = localStorage.getItem('access_token');
  const editProfilePath = oauthToken ? '/editprofile' : '/editpass';

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const memberId = decodedToken.memberId;
        const response = await API.get(
          `${process.env.REACT_APP_API_URL}/members/${memberId}`
        );
        const data = response.data;
        setProfileData(data);
      } catch (error) {
        console.error('프로필 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };
    fetchProfileData();
  }, []);

  // null 에 대한 loading 처리
  if (!profileData) {
    return (
      <>
        <div>Loading...</div>;
        <Link to={editProfilePath}>
          <button>정보수정</button>
        </Link>
      </>
    );
  }

  return (
    <UserProfileWrapper>
      <div className="flexCenter">
        <div className="media">
          <ImgBox>
            <img
              className="user-photo"
              src={profileData.img ? profileData.img : '/defaultprofile.png'}
              alt="user profile"
            />
          </ImgBox>
          <h2>{profileData.nickName}</h2>
          <span className="til-tier">
            <TilTierText
              tilTier={profileData.tilTier}
              textTil="tilday"
              size="13px"
            />
          </span>
        </div>
        <p>
          {profileData.aboutMe
            ? profileData.aboutMe
            : `저는 개발자가 되기위한 ${profileData.nickName} 입니다 최고의 개발자가 되는날 까지 열심히 Til을 기록하겠습니다.`}
        </p>
      </div>
      <Link to={editProfilePath}>
        <button>
          <img src={IconPencil} alt="pencil icon" />
          정보수정
        </button>
      </Link>
    </UserProfileWrapper>
  );
}
