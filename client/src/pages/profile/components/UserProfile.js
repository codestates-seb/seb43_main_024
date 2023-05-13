import { HeaderLink } from '../../../default/styled';
import styled from 'styled-components';

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
  return (
    <UserProfileWrapper>
      <img
        src="https://velog.velcdn.com/images/chang626/post/c9533c4f-adbb-4411-bce4-b09293d64fbf/A03EACB4-4DFA-439A-A3FE-084635A89FE6.png"
        alt="user profile"
      />
      <h2>쩨우스</h2>
      <h4>10tiltil</h4>
      <HeaderLink>+팔로우</HeaderLink>
      <p>
        저는 웹사이트의 시각적인 부분을 담당하는 프론트엔드 개발자로,
        사용자들에게 최상의 경험을 제공하기 위해 항상 노력합니다. 최신 기술과
        동향을 학습하고, 웹사이트의 디자인과 기능을 개선하는 것을 즐깁니다. 제가
        개발한 웹사이트가 사용자들에게 편리하고 만족스러운 경험을 제공할 때 가장
        큰 보람을 느낍니다.
      </p>
    </UserProfileWrapper>
  );
}
