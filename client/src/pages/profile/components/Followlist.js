import styled from 'styled-components';
import { FollowCard } from '../../../default/FollowCard';

const FollowlistWrapper = styled.div`
  box-sizing: border-box;
  border: 5px solid violet;
`;

//TODO: Map 함수를 이용하여 follow card를 follow 수가 있는 만큼 불러오기
//TODO: 페이지네이션으로 follow리스트를 통체하시오.

export function FollowList() {
  return (
    <FollowlistWrapper>
      <FollowCard />
    </FollowlistWrapper>
  );
}
