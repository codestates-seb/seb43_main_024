import styled from 'styled-components';
import '../../default/style.css';
import { TilWrapper } from '../../default/styled';
import TilList from './component/TilList';

const H1 = styled.h1`
  margin: 0px 10px;
`;

function FollowTil() {
  return (
    <TilWrapper>
      <div>
        <H1>내가 팔로우한 틸</H1>
        <TilList />
      </div>
    </TilWrapper>
  );
}

export default FollowTil;
