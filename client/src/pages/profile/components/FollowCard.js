import styled from 'styled-components';
import { HeaderLink } from '../../../default/styled';

const FollowComponentWrapper = styled.li`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 295px;
  height: 331px;
  background: #ffffff;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  img {
    border: 3px solid #ffffff;
    width: 100px;
    height: 100px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    border-radius: 100%;
  }

  h1 {
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 150%;

    letter-spacing: -0.023em;

    color: #222222;

    padding-top: 5px;
    margin-bottom: 0px;
  }

  h4 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;
    /* or 22px */

    letter-spacing: -0.023em;

    color: #888888;
  }

  p {
    font-family: 'NanumGothic';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 150%;

    text-align: center;
    letter-spacing: -0.023em;

    color: #555555;

    padding: 10px;
  }

  div {
  }
`;

export function FollowCard() {
  return (
    <FollowComponentWrapper>
      <img
        src="http://file3.instiz.net/data/cached_img/upload/2019/09/20/13/8304c05163b40eb9bcdd41a15d1afed6.jpg"
        alt="follower"
      />
      <h1>UserName</h1>
      <h4>12Til 🐥</h4>
      <p>
        안정적이고 유연한 코드를 작성하는 것을 좋아하는 주니어 개발자입니다.
        새로운 기술을 배우고 성장하며, 팀원들과의 협업을 즐깁니다.
      </p>
      <div>
        <HeaderLink Out>프로필</HeaderLink>
        <HeaderLink>팔로우해제</HeaderLink>
      </div>
    </FollowComponentWrapper>
  );
}
