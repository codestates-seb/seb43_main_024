import '../../default/style.css';
import { TilWrapper, TitleH1 } from '../../default/styled';
import TilList from './component/TilList';

function FollowTil() {
  return (
    <TilWrapper>
      <div>
        <TitleH1>내가 팔로우한 틸</TitleH1>
        <TilList />
      </div>
    </TilWrapper>
  );
}

export default FollowTil;
