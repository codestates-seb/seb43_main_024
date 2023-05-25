import { Outlet } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';
import styled from 'styled-components';
import { ProfileNav } from './components/ProfileNav';
import { InnerWrapper } from '../../default/styled';

const PageWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 905px;
  height: 100vh;
  top: 155px;
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
    <InnerWrapper>
      <UserProfile />
      <ProfileNav />
      <PageWrapper>
        <ContentsPosition>
          <ProfileContents>
            <Outlet />
          </ProfileContents>
        </ContentsPosition>
      </PageWrapper>
    </InnerWrapper>
  );
}

export { Profile };
