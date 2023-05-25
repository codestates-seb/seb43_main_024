import { Outlet } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';
import { ProfileNav } from './components/ProfileNav';
import {
  InnerWrapper,
  PageWrapper,
  ContentsPosition,
  ProfileContents,
} from '../../default/styled';

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
