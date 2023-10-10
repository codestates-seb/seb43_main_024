import { Outlet } from 'react-router-dom';
import { UserProfile } from './components/UserProfile';
import { ProfileNav } from './components/ProfileNav';
import {
  InnerWrapper,
  PageWrapper,
  ContentsPosition,
  ProfileContents,
  MyPageMedia,
} from '../../default/styled';

function Profile() {
  return (
    <InnerWrapper mypage>
      <MyPageMedia>
        <UserProfile />
        <ProfileNav />
        <PageWrapper>
          <ContentsPosition>
            <ProfileContents>
              <Outlet />
            </ProfileContents>
          </ContentsPosition>
        </PageWrapper>
      </MyPageMedia>
    </InnerWrapper>
  );
}

export { Profile };
