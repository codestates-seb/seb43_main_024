import '../../default/style.css';
import { TilWrapper, TitleH1 } from '../../default/styled';
import HotTilNav from './component/HotTilNav';
import HotTilSwiper from './component/HotTilSwiper';
import TilList from './component/TilList';

function HotTil() {
  return (
    <div>
      <TilWrapper>
        <TitleH1>가장 인기있는 틸</TitleH1>
      </TilWrapper>
      <HotTilSwiper />
      <TilWrapper>
        <HotTilNav />
        <TilList />
      </TilWrapper>
    </div>
  );
}

export default HotTil;
