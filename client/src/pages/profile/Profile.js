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
