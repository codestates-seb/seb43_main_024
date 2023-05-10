import styled from 'styled-components';
import { FollowCard } from './FollowCard';

const FollowlistWrapper = styled.div`
  box-sizing: border-box;
  border: 5px solid violet;
`;

export function FollowList() {
  return (
    <FollowlistWrapper>
      <FollowCard />
      <FollowCard />
      <FollowCard />
      <FollowCard />
    </FollowlistWrapper>
  );
}
