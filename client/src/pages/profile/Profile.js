import { Outlet } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';
import styled from 'styled-components';
import { ProfileNav } from './components/ProfileNav';

const PageWrapper = styled.div`
  position: relative;
  displat: flex;
  width: 100%;
  height: 100vh;
  top: 110px;
  left: 355px;
  box-sizing: border-box;
`;

const ContentsPosition = styled.div`
  width: 1100px;
  padding: 0px 60px;
  box-sizing: border-box;
`;

const ProfileContents = styled.div`
  box-sizing: border-box;
`;

function Profile() {
  return (
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
  );
}

export { Profile };
