import { Outlet } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';
import styled from 'styled-components';
import { ProfileNav } from './components/ProfileNav';
import useStore from '../../default/useStore';

const PageWrapper = styled.div`
  position: relative;
  displat: flex;

  width: 100%;
  height: 100vh;

  top: 110px;
  left: 355px;
  box-sizing: border-box;
  background: #f8f8f8;
`;

const ContentsPosition = styled.div`
  padding: 60px;
  box-sizing: border-box;
  background: #f8f8f8;
`;

const ProfileContents = styled.div`
  box-sizing: border-box;
  border: 5px dashed blue;
  background: #f8f8f8;
`;

function Profile() {
  const { isLogin } = useStore();
  return (
    <>
      {isLogin ? (
        <>
          <UserProfile />
          <ProfileNav />
          <PageWrapper>
            <ContentsPosition>
              <ProfileContents>
                <Outlet />
              </ProfileContents>
            </ContentsPosition>
          </PageWrapper>
        </>
      ) : (
        <p>올바르지 않는 접근입니다. 다시 로그인 해주세요</p>
      )}
    </>
  );
}

export { Profile };
