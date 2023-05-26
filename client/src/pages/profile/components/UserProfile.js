import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../API';
import jwt_decode from 'jwt-decode';
import { UserProfileWrapper, ImgBox } from '../../../default/styled';
import IconPencil from '../../../default/image/ico-pencil.svg';

export function UserProfile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const memberId = decodedToken.memberId;
        const response = await API.get(`/members/${memberId}`);
        const data = response.data;
        setProfileData(data);
        // console.log('/profile에 대한 get요청이 완료되었습니다.');
      } catch (error) {
        // console.error('프로필 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };
    fetchProfileData();
  }, []);

  // null 에 대한 loading 처리
  if (!profileData) {
    return (
      <>
        <div>Loading...</div>;
        <Link to="/editpass">
          <button>정보수정</button>
        </Link>
      </>
    );
  }

  return (
    <UserProfileWrapper>
      <div className="flexCenter">
        <ImgBox>
          <img
            className="user-photo"
            src={profileData.img ? profileData.img : '/defaultprofile.png'}
            alt="user profile"
          />
        </ImgBox>
        <h2>{profileData.nickName}</h2>
        {/* <h3>나의 다짐</h3> */}
        <p>
          {profileData.aboutMe
            ? profileData.aboutMe
            : `저는 개발자가 되기위한 ${profileData.nickName} 입니다 최고의 개발자가 되는날 까지 열심히 Til을 기록하겠습니다.`}
        </p>
      </div>
      <Link to="/editpass">
        <button>
          <img src={IconPencil} alt="pencil icon" />
          정보수정
        </button>
      </Link>
    </UserProfileWrapper>
  );
}
